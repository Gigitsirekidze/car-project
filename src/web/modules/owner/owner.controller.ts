import { Public } from '@common/decorators/public.decorator';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/enums/role';
import { AuthGuard } from '@common/modules/auth/auth.guard';
import { RolesGuard } from '@common/modules/auth/roles.guard';
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
import { OwnerDto } from './dto';
import { DepositRequestDto } from './dto/deposit-request.dto';
import { OwnerEntity } from './entities';
import { OwnerService } from './owner.service';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Roles(Role.USER, Role.ADMIN)
  @Post('/add')
  addOwner(@Body() carDto: OwnerDto): Promise<OwnerEntity> {
    return this.ownerService.addOwner(carDto);
  }

  @Public()
  @Get('/get-all')
  async getAllOwner(): Promise<OwnerEntity[]> {
    return this.ownerService.getAllOwner();
  }

  @Roles(Role.ADMIN)
  @Delete()
  deleteOneOwner(@Query() { username }): any {
    return this.ownerService.deleteOneOwner(username);
  }

  @Public()
  @Get('/:username')
  ownerDetails(@Param() { username }): Promise<OwnerEntity> {
    return this.ownerService.getOwnerDetails(username);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Post('/deposit')
  deposit(@Body() depositRequestDto: DepositRequestDto) {
    return this.ownerService.deposit(depositRequestDto);
  }
}
