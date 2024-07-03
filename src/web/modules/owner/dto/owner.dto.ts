import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Gender } from '../enums';

export class OwnerDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
