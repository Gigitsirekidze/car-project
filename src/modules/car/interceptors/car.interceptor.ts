import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class CarInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const desiredRequest = {};
    const requestBody = context.switchToHttp().getRequest().body;

    Object.keys(context.switchToHttp().getRequest().body).forEach((item) => {
      desiredRequest[item.toLowerCase()] = requestBody[item];
    });

    context.switchToHttp().getRequest().body = desiredRequest;

    return next.handle().pipe(
      map(() => {
        const desiredResponse = {};

        Object.keys(requestBody).forEach((item) => {
          desiredResponse[item.toUpperCase()] = requestBody[item];
        });

        return desiredResponse;
      }),
    );
  }
}
