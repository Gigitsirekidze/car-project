import { LoginResponseDto, RegisterResponseDto } from '../dtos';
import { UserEntity } from '../entities';

export class ResponseMappers {
  loginResponse(userFromDb: UserEntity, accessToken: string): LoginResponseDto {
    return {
      accessToken,
      email: userFromDb.email,
      role: userFromDb.role,
      status: 'OK',
      username: userFromDb.username,
    };
  }

  registerResponse(registeredUser: UserEntity): RegisterResponseDto {
    return {
      email: registeredUser.email,
      role: registeredUser.role,
      status: 'OK',
      username: registeredUser.username,
    };
  }
}
