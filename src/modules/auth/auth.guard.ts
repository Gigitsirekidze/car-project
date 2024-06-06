import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = context.switchToHttp().getRequest();

    const requestBody = this.authService.validate(headers.authorization);

    if (!requestBody) {
      throw new UnauthorizedException({ error: 'unauthorized' });
    }

    context.switchToHttp().getRequest().body = requestBody;

    return true;
  }
}
