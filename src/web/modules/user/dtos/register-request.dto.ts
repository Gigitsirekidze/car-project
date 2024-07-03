import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '@common/enums/role';

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
