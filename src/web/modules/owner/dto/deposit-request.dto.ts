import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DepositRequestDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
