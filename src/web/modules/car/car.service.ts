import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { OwnerEntity } from '../owner/entities';
import { OwnCarRequestDto, AddCarRequestDto, AddCarResponseDto } from './dto';
import { OwnCarResponseDto } from './dto/own-car-response.dto';
import { CarEntity } from './entities/car.entity';
import { ResponseMappers } from './mappers/response.mappers';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
    private readonly responseMappers: ResponseMappers,
    private readonly httpService: HttpService,
  ) {}

  async addCar(body: AddCarRequestDto): Promise<AddCarResponseDto> {
    const carFromDb = await this.carRepository.save<CarEntity>(body);

    return this.responseMappers.addCarResponse(carFromDb);
  }

  async getAllCars(): Promise<CarEntity[]> {
    console.log('simulating get all cars');

    return this.carRepository.find({ relations: ['owner', 'dealerships'] });
  }

  deleteOneCar(id: number): any {
    console.log('delete car with id: ', id);

    return this.carRepository.delete({ id });
  }

  getCarDetails(id: number): Promise<CarEntity> {
    console.log('car details with id: ', id);

    return this.carRepository
      .findOneOrFail({ where: { id }, relations: ['owner', 'dealerships'] })
      .catch(() => {
        throw new HttpException(
          { error: `car with id: ${id} not found` },
          HttpStatus.NOT_FOUND,
        );
      });
  }

  async ownCar(ownCarDto: OwnCarRequestDto): Promise<OwnCarResponseDto> {
    const ownerFromDb = await this.ownerRepository.findOneOrFail({
      where: {
        username: ownCarDto.ownerId,
      },
      relations: ['cars', 'balances'],
    });

    const carFromDb = await this.carRepository.findOneByOrFail({
      id: ownCarDto.carId,
    });

    const balanceInCurrency = ownerFromDb.balances.find(
      (balance) => balance.currency === ownCarDto.currency,
    );

    const source = this.httpService.get(
      `https://open.er-api.com/v6/latest/USD`,
    );

    const { data } = await lastValueFrom(source);

    const carPriceInCurrency = carFromDb.price * data.rates[ownCarDto.currency];

    if (!balanceInCurrency || balanceInCurrency.amount < carPriceInCurrency) {
      throw new HttpException(
        { error: 'insufficient balance' },
        HttpStatus.BAD_REQUEST,
      );
    }

    balanceInCurrency.amount -= carPriceInCurrency;

    ownerFromDb.cars = ownerFromDb.cars || [];

    if (!ownerFromDb.cars.find((car) => car.id === carFromDb.id)) {
      ownerFromDb.cars.push(carFromDb);
    }

    await this.ownerRepository.save(ownerFromDb);

    return this.responseMappers.ownCar(ownerFromDb);
  }
}
