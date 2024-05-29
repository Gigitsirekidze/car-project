import { Injectable } from '@nestjs/common';
import { CarDto } from './dto/car.dto';

@Injectable()
export class CarService {
  addCar(body: CarDto): string {
    console.log('car add simulation: ', body);

    return 'OK';
  }

  getAllCars(): CarDto[] {
    console.log('simulating get all cars');

    return [
      {
        id: 1,
        brand: 'mercedes',
        age: 2015,
      },
      {
        id: 2,
        brand: 'honda',
        age: 2010,
        milllage: 100000,
      },
    ];
  }

  deleteOneCar(id: number): string {
    console.log('delete car with id: ', id);

    return 'OK';
  }

  getCarDetails(id: number): CarDto {
    console.log('car details with id: ', id);

    return {
      id,
      brand: 'honda',
      age: 2010,
      milllage: 100000,
    };
  }
}
