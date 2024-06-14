import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { DealershipService } from './dealership.service';
import { DealershipDto } from './dto';
import { AttachCarDto } from './dto/attach-car.dto';
import { DealershipEntity } from './entities';

@UseGuards(AuthGuard)
@ApiTags('dealership')
@Controller('dealership')
export class DealershipController {
  constructor(private readonly dealershipService: DealershipService) {}

  @Post('/add')
  addDealership(@Body() carDto: DealershipDto): Promise<DealershipEntity> {
    return this.dealershipService.addDealership(carDto);
  }

  @Get('/get-all')
  async getAllDealership(): Promise<DealershipEntity[]> {
    return this.dealershipService.getAllDealership();
  }

  @Delete()
  deleteOneDealership(@Query() { id }): any {
    return this.dealershipService.deleteOneDealership(id);
  }

  @Get('/:id')
  dealershipDetails(@Param() { id }): Promise<DealershipEntity> {
    return this.dealershipService.getDealershipDetails(id);
  }

  @Post('/attach-car')
  attachCar(@Body() attachCarRequest: AttachCarDto) {
    return this.dealershipService.attachCar(attachCarRequest);
  }
}
