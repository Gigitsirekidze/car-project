import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  private getToken(headers: any): string {
    const [type, token] = headers.authorization?.split(' ');

    if (!(type === 'Bearer')) {
      throw new Error();
    }

    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    let token;
    try {
      token = this.getToken(request.headers);
    } catch (e) {
      throw new UnauthorizedException();
    }

    request['user'] = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    return true;
  }
}
