import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable, catchError, throwError } from 'rxjs';
import { ExceptionUtils } from '../utils/exception.utils';
@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((exception) => {
        this.logger.error(exception);
        const response = ExceptionUtils.exceptionToMsgResponse(exception);
        return throwError(() => new RpcException(response));
      }),
    );
  }
}
