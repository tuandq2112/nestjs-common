// request-logging.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let message: string;
    const type = context.getType();

    if (type === 'http') {
      const request = context.switchToHttp().getRequest();

      const { ip, method, originalUrl, body } = request;
      const userAgent = request.get('user-agent') || '';
      message = `${method} - ${originalUrl} - ${JSON.stringify(
        body,
      )} -  ${ip} - ${userAgent}`;
    } else if (type === 'rpc') {
      const rpcContext = context.switchToRpc();
      const pattern = rpcContext.getContext<TcpContext>().getPattern();

      const data = rpcContext.getData();
      message = `${pattern} - ${JSON.stringify(data)}`;
    } else {
      message = `${JSON.stringify(context.getArgs)}`;
    }
    this.logger.log(message);
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`After... ${Date.now() - now}ms`);
      }),
    );
  }
}
