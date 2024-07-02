import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginRequestDto, RegisterRequestDto } from './dtos';
import { UserEntity } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginRequestDto) {
    const userFromDb = await this.userRepository.findOneBy({
      username: loginDto.username,
    });

    if (!(userFromDb?.password === loginDto.password)) {
      throw new UnauthorizedException();
    }

    const payload = { role: userFromDb.role, username: userFromDb.username };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_KEY,
      }),
    };
  }

  async register(registerDto: RegisterRequestDto): Promise<UserEntity> {
    const userFromDb = await this.userRepository.findOneBy({
      username: registerDto.username,
    });

    const userFromDbWithEmail = await this.userRepository.findOneBy({
      email: registerDto.email,
    });

    if (userFromDb || userFromDbWithEmail) {
      throw new HttpException(
        { errorMessage: 'this email or username already exists' },
        HttpStatus.CONFLICT,
      );
    }

    return await this.userRepository.save(registerDto);
  }
}
