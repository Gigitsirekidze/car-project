import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto, RegisterResponseDto } from './dtos';
import { UserEntity } from './entities';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.userService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    return this.userService.register(registerDto);
  }
}
