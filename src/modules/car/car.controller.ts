import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CarService } from './car.service';
import { CarDto, OwnCarDto } from './dto';
import { CarEntity } from './entities/car.entity';
import { CarFilter } from './filters/car-filter';
import { CarInterceptor } from './interceptors/car.interceptor';

@UseFilters(CarFilter)
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('car')
//@UseInterceptors(CarInterceptor)
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Roles(Role.USER, Role.ADMIN)
  @Post('/add')
  addCar(@Body() carDto: CarDto): Promise<CarEntity> {
    return this.carService.addCar(carDto);
  }

  @Public()
  @Get('/get-all')
  async getAllCars(): Promise<CarEntity[]> {
    return this.carService.getAllCars();
  }

  @Roles(Role.ADMIN)
  @Delete()
  deleteOneCar(@Query() { id }): any {
    return this.carService.deleteOneCar(id);
  }

  @Public()
  @Get('/:id')
  carDetails(@Param() { id }): Promise<CarEntity> {
    return this.carService.getCarDetails(id);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Post('/own')
  ownCar(@Body() ownCarDto: OwnCarDto) {
    return this.carService.ownCar(ownCarDto);
  }
}
