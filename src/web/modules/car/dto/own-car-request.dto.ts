import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OwnCarRequestDto {
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  carId: number;
}
