import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch(Error)
export class CarFilter implements ExceptionFilter {
  private readonly INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const response = host.switchToHttp().getResponse();

    response
      .status(exception.status || HttpStatus.INTERNAL_SERVER_ERROR)
      .send(exception.response || { error: this.INTERNAL_SERVER_ERROR });
  }
}
