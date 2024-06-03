import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  readonly token = 'tcfvghbjnjjkkmlkl,luhbyfcr';

  validate(receivedToken): boolean {
    return receivedToken === this.token;
  }
}
