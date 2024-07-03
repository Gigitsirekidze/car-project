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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorators/public.decorator';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/enums/role';
import { AuthGuard } from '@common/modules/auth/auth.guard';
import { RolesGuard } from '@common/modules/auth/roles.guard';
import { CarService } from './car.service';
import { AddCarRequestDto, AddCarResponseDto, OwnCarRequestDto } from './dto';
import { OwnCarResponseDto } from './dto/own-car-response.dto';
import { CarEntity } from './entities/car.entity';
import { CarFilter } from './filters/car-filter';

@UseFilters(CarFilter)
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Roles(Role.USER, Role.ADMIN)
  @Post('/add')
  addCar(@Body() carDto: AddCarRequestDto): Promise<AddCarResponseDto> {
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

  @Roles(Role.USER)
  @Post('/own')
  ownCar(@Body() ownCarDto: OwnCarRequestDto): Promise<OwnCarResponseDto> {
    return this.carService.ownCar(ownCarDto);
  }
}
