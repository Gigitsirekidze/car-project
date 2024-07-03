import { OwnerEntity } from '../../owner/entities';
import { AddCarResponseDto } from '../dto';
import { OwnCarResponseDto } from '../dto/own-car-response.dto';
import { CarEntity } from '../entities/car.entity';

export class ResponseMappers {
  addCarResponse(carEntity: CarEntity): AddCarResponseDto {
    return {
      brand: carEntity.brand,
      date: carEntity.date,
      millage: carEntity.millage,
    };
  }

  ownCar(ownerFromDb: OwnerEntity): OwnCarResponseDto {
    return {
      cars: ownerFromDb.cars,
      name: ownerFromDb.name,
      username: ownerFromDb.username,
    };
  }
}
