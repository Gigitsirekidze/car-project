import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DealershipDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}
