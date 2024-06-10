import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarDto } from './dto/car.dto';
import { CarEntity } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  addCar(body: CarDto): Promise<CarEntity> {
    console.log('car add simulation: ', body);

    return this.carRepository.save<CarEntity>(body);
  }

  async getAllCars(): Promise<CarEntity[]> {
    console.log('simulating get all cars');

    return this.carRepository.find();
  }

  deleteOneCar(id: number): any {
    console.log('delete car with id: ', id);

    return this.carRepository.delete({ id });
  }

  async getCarDetails(id: number): Promise<CarEntity> {
    console.log('car details with id: ', id);

    return this.carRepository.findOneByOrFail({ id }).catch(() => {
      throw new HttpException(
        { error: `car with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    });
  }
}
