import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  imports: [AuthModule],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
