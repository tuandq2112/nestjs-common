// request-logging.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { ip, method, originalUrl, body } = request;
    const userAgent = request.get('user-agent') || '';
    const message = `${method} - ${originalUrl} - ${JSON.stringify(
      body,
    )} -  ${ip} - ${userAgent}`;
    return next.handle().pipe(
      tap(() => {
        this.logger.log(message);
      }),
    );
  }
}
