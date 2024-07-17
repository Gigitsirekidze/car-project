import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@common/modules/auth/auth.module';
import { BalanceEntity, OwnerEntity } from '../owner/entities';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarEntity } from './entities/car.entity';
import { ResponseMappers } from './mappers/response.mappers';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CarEntity, OwnerEntity, BalanceEntity]),
    HttpModule,
  ],
  providers: [CarService, ResponseMappers],
  controllers: [CarController],
})
export class CarModule {}
