import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from '../car/car.module';
import { DealershipModule } from '../dealership/dealership.module';
import { OwnerModule } from '../owner/owner.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5440,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: false,
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsRun: true,
    }),
    CarModule,
    OwnerModule,
    DealershipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
