import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { OwnerEntity } from '../owner/entities';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarEntity } from './entities/car.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([CarEntity, OwnerEntity])],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
