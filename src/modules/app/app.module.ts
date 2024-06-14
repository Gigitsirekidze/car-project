import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import config from '../../common/config';
import { CarModule } from '../car/car.module';
import { DealershipModule } from '../dealership/dealership.module';
import { OwnerModule } from '../owner/owner.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().default('pass123'),
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_NAME: Joi.string().default('postgres'),
        DATABASE_PORT: Joi.number().default(5440),
      }),
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    CarModule,
    OwnerModule,
    DealershipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
