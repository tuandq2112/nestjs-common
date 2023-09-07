import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, catchError, throwError } from 'rxjs';
import { Logger } from 'winston';
import { ExceptionUtils } from '../utils/exception.utils';
@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((exception) => {
        const message = ExceptionUtils.exactMessageFromException(exception);
        this.logger.error(message);
        const [response, status] =
          ExceptionUtils.exceptionToMsgResponse(exception);
        return throwError(() => new RpcException(response));
      }),
    );
  }
}
