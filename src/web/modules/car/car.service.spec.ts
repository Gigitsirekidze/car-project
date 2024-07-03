import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service';
import { CarBrands } from './enums/car-brands';

describe('CarService', () => {
  let carService: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarService],
    }).compile();

    carService = module.get<CarService>(CarService);
  });

  describe('car add', () => {
    it('successfull car add', async () => {
      const body = {
        id: 3,
        brand: CarBrands.BMW,
        date: new Date(),
        millage: 100,
      };

      const result = await carService.addCar(body);

      expect(result).toEqual(body);
    });
  });
});
