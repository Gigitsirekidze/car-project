import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OwnCarDto {
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @IsNotEmpty()
  @IsNumber()
  carId: number;
}
