import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarDto } from './dto/car.dto';
import { CarBrands } from './enums/car-brands';

@Injectable()
export class CarService {
  addCar(body: CarDto): string {
    console.log('car add simulation: ', body);

    throw new HttpException({ error: 'internal esfgsf' }, HttpStatus.NOT_FOUND);

    return 'OK';
  }

  getAllCars(): CarDto[] {
    console.log('simulating get all cars');

    return [
      {
        id: 1,
        brand: CarBrands.BMW,
        date: new Date(),
        millage: null,
      },
      {
        id: 2,
        brand: CarBrands.BMW,
        date: new Date(),
        millage: null,
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
      brand: CarBrands.HONDA,
      date: new Date(),
      millage: 100000,
    };
  }
}
