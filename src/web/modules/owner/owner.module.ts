import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../common/modules/auth/auth.module';
import { OwnerEntity } from './entities';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([OwnerEntity])],
  providers: [OwnerService],
  controllers: [OwnerController],
})
export class OwnerModule {}
