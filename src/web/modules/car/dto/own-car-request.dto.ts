import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OwnCarRequestDto {
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @IsNotEmpty()
  @IsNumber()
  carId: number;
}
