import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MsgResponse } from '../interface/msg_response.interface';

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, MsgResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<MsgResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        data: data,
        code: context.switchToHttp().getResponse().statusCode,
        message: data.message || 'Success',
      })),
    );
  }
}
