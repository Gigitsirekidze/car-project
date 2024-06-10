import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarEntity } from './entities/car.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([CarEntity])],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
