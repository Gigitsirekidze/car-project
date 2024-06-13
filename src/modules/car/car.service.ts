import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerEntity } from '../owner/entities';
import { OwnCarDto, CarDto } from './dto';
import { CarEntity } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
  ) {}

  addCar(body: CarDto): Promise<CarEntity> {
    console.log('car add simulation: ', body);

    return this.carRepository.save<CarEntity>(body);
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

  async ownCar(ownCarDto: OwnCarDto): Promise<CarEntity> {
    const ownerFromDb = await this.ownerRepository.findOneByOrFail({
      id: ownCarDto.ownerId,
    });

    const carFromDb = await this.carRepository.findOneByOrFail({
      id: ownCarDto.carId,
    });

    return this.carRepository.save({ ...carFromDb, owner: ownerFromDb });
  }
}
