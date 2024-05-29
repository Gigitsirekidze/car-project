import { Module } from '@nestjs/common';
import { CarModule } from '../car/car.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
