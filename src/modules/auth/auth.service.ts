import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CarDto } from '../car/dto/car.dto';

@Injectable()
export class AuthService {
  readonly secret = 'hjbsfbnjdfovofvppork';

  constructor(private readonly jwtService: JwtService) {}

  validate(receivedToken: string): CarDto | false {
    receivedToken = receivedToken.replace('Bearer ', '');

    try {
      return this.jwtService.verify<CarDto>(receivedToken, {
        secret: this.secret,
      });
    } catch (e) {
      console.log(e);

      return false;
    }
  }
}
