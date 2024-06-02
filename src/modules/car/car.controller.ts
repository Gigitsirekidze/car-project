import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './dto/car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('/add')
  addCar(@Body() carDto: CarDto): string {
    return this.carService.addCar(carDto);
  }

  @Get('/get-all')
  getAllCars(): CarDto[] {
    return this.carService.getAllCars();
  }

  @Delete()
  deleteOneCar(@Query() { id }): string {
    return this.carService.deleteOneCar(id);
  }

  @Get('/:id')
  carDetails(@Param() { id }): CarDto {
    return this.carService.getCarDetails(id);
  }
}
