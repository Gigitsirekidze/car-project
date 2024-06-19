import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CarService } from './car.service';
import { CarDto, OwnCarDto } from './dto';
import { CarEntity } from './entities/car.entity';
import { CarFilter } from './filters/car-filter';

@UseFilters(CarFilter)
@UseGuards(AuthGuard)
@ApiTags('car')
//@UseInterceptors(CarInterceptor)
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('/add')
  addCar(@Body() carDto: CarDto): Promise<CarEntity> {
    return this.carService.addCar(carDto);
  }

  @Get('/get-all')
  async getAllCars(): Promise<CarEntity[]> {
    return this.carService.getAllCars();
  }

  @Delete()
  deleteOneCar(@Query() { id }): any {
    return this.carService.deleteOneCar(id);
  }

  @Get('/:id')
  carDetails(@Param() { id }): Promise<CarEntity> {
    return this.carService.getCarDetails(id);
  }

  @Post('/own')
  ownCar(@Body() ownCarDto: OwnCarDto) {
    return this.carService.ownCar(ownCarDto);
  }
}
