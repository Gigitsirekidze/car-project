import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../enums/role';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log('-------', user);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { role: user.role, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: any) {
    console.log(registerDto);
    const existingUser = await this.usersService.findOne(registerDto);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    return await this.usersService.create(registerDto);
  }
}
