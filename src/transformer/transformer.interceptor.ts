import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMsgResponse } from '../interface/msg_response.interface';
import { PaginationHelper } from '../utils';

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, IMsgResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IMsgResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const response: IMsgResponse<T> = {
          data: data,
          code: context.switchToHttp().getResponse().statusCode,
          message: data.message || 'Success',
        };

        if (PaginationHelper.isPaginationDTO(data)) {
          response.data = data.data;
          response.totalPages = data.totalPages;
          response.pageNumber = data.pageNumber;
          response.pageSize = data.pageSize;
          response.numberOfElements = data.numberOfElements;
        }

        return response;
      }),
    );
  }
}
