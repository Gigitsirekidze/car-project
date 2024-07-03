import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../common/modules/auth/auth.module';
import { CarEntity } from '../car/entities/car.entity';
import { DealershipController } from './dealership.controller';
import { DealershipService } from './dealership.service';
import { DealershipEntity } from './entities';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([DealershipEntity, CarEntity])],
  providers: [DealershipService],
  controllers: [DealershipController],
})
export class DealershipModule {}
