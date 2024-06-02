import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CustomValidator } from '../validator-decorators/custom-validator';

export class CarDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsNumber()
  @IsOptional()
  @CustomValidator()
  millage: number;
}
