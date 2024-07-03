import { IsNotEmpty, IsNumber } from 'class-validator';

export class AttachCarDto {
  @IsNotEmpty()
  @IsNumber()
  carId: number;

  @IsNotEmpty()
  @IsNumber()
  dealershipId: number;
}
