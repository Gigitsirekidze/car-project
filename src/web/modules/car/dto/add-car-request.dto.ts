import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CarBrands } from '../enums/car-brands';
import { CustomValidator } from '../validator-decorators/custom-validator';

export class AddCarRequestDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsEnum(CarBrands)
  @IsNotEmpty()
  brand: CarBrands;

  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsNumber()
  @IsOptional()
  @CustomValidator()
  millage: number;
}
