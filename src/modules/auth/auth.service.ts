import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CarDto } from '../car/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  validate(receivedToken: string): CarDto | false {
    receivedToken = receivedToken.replace('Bearer ', '');

    try {
      return this.jwtService.verify<CarDto>(receivedToken, {
        secret: this.config.get('secretKey'),
      });
    } catch (e) {
      console.log(e);

      return false;
    }
  }
}
