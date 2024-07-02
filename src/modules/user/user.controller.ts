import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequestDto, RegisterRequestDto } from './dtos';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(
    @Body() loginDto: LoginRequestDto,
  ): Promise<{ access_token: string }> {
    return this.userService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterRequestDto): Promise<any> {
    return this.userService.register(registerDto);
  }
}
