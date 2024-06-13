import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from '../car/entities/car.entity';
import { DealershipDto } from './dto';
import { AttachCarDto } from './dto/attach-car.dto';
import { DealershipEntity } from './entities';

@Injectable()
export class DealershipService {
  constructor(
    @InjectRepository(DealershipEntity)
    private readonly dealershipRepository: Repository<DealershipEntity>,
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  addDealership(body: DealershipDto): Promise<DealershipEntity> {
    console.log('owner add simulation: ', body);

    return this.dealershipRepository.save<DealershipEntity>(body);
  }

  async getAllDealership(): Promise<DealershipEntity[]> {
    console.log('simulating get all owners');

    return this.dealershipRepository.find({ relations: ['cars'] });
  }

  deleteOneDealership(id: number): any {
    console.log('delete owner with id: ', id);

    return this.dealershipRepository.delete({ id });
  }

  async getDealershipDetails(id: number): Promise<DealershipEntity> {
    console.log('owner details with id: ', id);

    return this.dealershipRepository
      .findOneOrFail({ where: { id }, relations: ['cars'] })
      .catch(() => {
        throw new HttpException(
          { error: `owner with id: ${id} not found` },
          HttpStatus.NOT_FOUND,
        );
      });
  }

  async attachCar(attachCarRequest: AttachCarDto) {
    const dealershipFromDb = await this.dealershipRepository.findOneByOrFail({
      id: attachCarRequest.dealershipId,
    });

    const carFromDb = await this.carRepository.findOneByOrFail({
      id: attachCarRequest.carId,
    });

    const allCarsOfDealership = dealershipFromDb.cars
      ? [...dealershipFromDb.cars, carFromDb]
      : [carFromDb];

    return this.dealershipRepository.save({
      ...dealershipFromDb,
      cars: allCarsOfDealership,
    });
  }
}
