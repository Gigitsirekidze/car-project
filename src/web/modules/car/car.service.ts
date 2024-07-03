import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      relations: ['cars'],
    });

    const carFromDb = await this.carRepository.findOneByOrFail({
      id: ownCarDto.carId,
    });

    ownerFromDb.cars = ownerFromDb.cars || [];

    if (!ownerFromDb.cars.find((car) => car.id === carFromDb.id)) {
      ownerFromDb.cars.push(carFromDb);
    }

    await this.ownerRepository.save(ownerFromDb);

    return this.responseMappers.ownCar(ownerFromDb);
  }
}
