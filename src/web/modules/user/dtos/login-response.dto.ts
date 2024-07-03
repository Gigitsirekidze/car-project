import { Role } from '@common/enums/role';

export class LoginResponseDto {
  status: string;
  accessToken: string;
  username: string;
  role: Role;
  email: string;
}
