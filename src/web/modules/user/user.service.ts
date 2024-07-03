import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as process from 'process';
import { Repository } from 'typeorm';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dtos';
import { UserEntity } from './entities';
import { ResponseMappers } from './mappers/response.mappers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly responseMappers: ResponseMappers,
  ) {}

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const userFromDb = await this.userRepository.findOneBy({
      username: loginDto.username,
    });

    const hashedPassword = crypto
      .createHash('sha1')
      .update(process.env.HASH_KEY + loginDto.password)
      .digest('hex');

    if (!(userFromDb?.password === hashedPassword)) {
      throw new UnauthorizedException();
    }

    const payload = { role: userFromDb.role, username: userFromDb.username };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY,
    });

    return this.responseMappers.loginResponse(userFromDb, accessToken);
  }

  async register(
    registerDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
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

    registerDto.password = crypto
      .createHash('sha1')
      .update(process.env.HASH_KEY + registerDto.password)
      .digest('hex');

    const registeredUser =
      await this.userRepository.save<UserEntity>(registerDto);

    return this.responseMappers.registerResponse(registeredUser);
  }
}
