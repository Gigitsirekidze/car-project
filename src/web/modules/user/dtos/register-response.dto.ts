import { Role } from '@common/enums/role';

export class RegisterResponseDto {
  status: string;
  username: string;
  role: Role;
  email: string;
}
