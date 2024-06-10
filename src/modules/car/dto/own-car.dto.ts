import { IsNotEmpty, IsNumber } from 'class-validator';

export class OwnCarDto {
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @IsNotEmpty()
  @IsNumber()
  carId: number;
}
