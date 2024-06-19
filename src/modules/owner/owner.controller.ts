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
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { OwnerDto } from './dto';
import { OwnerEntity } from './entities';
import { OwnerService } from './owner.service';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/add')
  @Roles(Role.ADMIN)
  addOwner(@Body() carDto: OwnerDto): Promise<OwnerEntity> {
    return this.ownerService.addOwner(carDto);
  }

  @Get('/get-all')
  async getAllOwner(): Promise<OwnerEntity[]> {
    return this.ownerService.getAllOwner();
  }

  @Delete()
  @Roles(Role.ADMIN)
  deleteOneOwner(@Query() { username }): any {
    return this.ownerService.deleteOneOwner(username);
  }

  @Get('/:username')
  ownerDetails(@Param() { username }): Promise<OwnerEntity> {
    return this.ownerService.getOwnerDetails(username);
  }
}
