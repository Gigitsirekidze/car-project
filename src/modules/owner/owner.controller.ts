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
import { OwnerDto } from './dto';
import { OwnerEntity } from './entities';
import { OwnerService } from './owner.service';

@UseGuards(AuthGuard)
@ApiTags('owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/add')
  addOwner(@Body() carDto: OwnerDto): Promise<OwnerEntity> {
    return this.ownerService.addOwner(carDto);
  }

  @Get('/get-all')
  async getAllOwner(): Promise<OwnerEntity[]> {
    return this.ownerService.getAllOwner();
  }

  @Delete()
  deleteOneOwner(@Query() { id }): any {
    return this.ownerService.deleteOneOwner(id);
  }

  @Get('/:id')
  ownerDetails(@Param() { id }): Promise<OwnerEntity> {
    return this.ownerService.getOwnerDetails(id);
  }
}
