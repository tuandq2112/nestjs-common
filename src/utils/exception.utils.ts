import {
  ForbiddenException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseException } from '../exception';
import { IMsgResponse } from '../interface';

export class ExceptionUtils {
  public static exactMessageFromException(
    exception:
      | BaseException
      | UnauthorizedException
      | ForbiddenException
      | Error,
  ): string {
    let message = 'Internal Server Error';
    if (exception instanceof BaseException) {
      message = JSON.stringify(exception.message);
    } else {
      message = JSON.stringify(exception.stack || exception.message);
    }
    return message;
  }

  public static exceptionToMsgResponse(
    exception:
      | BaseException
      | UnauthorizedException
      | ForbiddenException
      | Error,
  ): [IMsgResponse<any>, number] {
    let responseBody: IMsgResponse<any>;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = HttpStatus.INTERNAL_SERVER_ERROR;
    let data: any = {};
    let message = 'Internal server error';

    if (exception instanceof BaseException) {
      status = HttpStatus.OK;
      code = exception.code;
      message = JSON.stringify(exception.message);
      data = exception.data;
    } else if (exception instanceof UnauthorizedException) {
      status = HttpStatus.UNAUTHORIZED;
      code = HttpStatus.UNAUTHORIZED;
      message = 'Unauthorized';
    } else if (exception instanceof ForbiddenException) {
      status = HttpStatus.FORBIDDEN;
      code = HttpStatus.FORBIDDEN;
      message = 'Forbidden';
    } else {
      message = JSON.stringify(exception.stack || exception.message);
    }

    responseBody = { code, message, data };
    return [responseBody, status];
  }
}
