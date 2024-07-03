import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AddCarRequestDto } from '../../../web/modules/car/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  validate(receivedToken: string): AddCarRequestDto | false {
    receivedToken = receivedToken.replace('Bearer ', '');

    try {
      return this.jwtService.verify<AddCarRequestDto>(receivedToken, {
        secret: this.config.get('secretKey'),
      });
    } catch (e) {
      console.log(e);

      return false;
    }
  }
}
