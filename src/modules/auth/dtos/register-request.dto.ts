import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../../enums/role';

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
