import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { BaseException } from '../exception';
import { IMsgResponse } from '../interface';

export class ExceptionUtils {
  public static exceptionToMsgResponse(
    exception: BadRequestException | BaseException | HttpException,
  ): IMsgResponse<any> {
    let responseBody: IMsgResponse<any>;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = HttpStatus.INTERNAL_SERVER_ERROR;
    let data: any = {};
    let message = 'Internal server error';
    if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      code = HttpStatus.BAD_REQUEST;
      const errorResponse = exception.getResponse() as { message: string };
      message = errorResponse?.message
        ? errorResponse?.message
        : exception?.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      code = exception.getStatus();
      message = exception.message;
    } else {
      status = exception.status;
      code = exception.code;
      message = exception.message;
      data = exception.data;
    }

    responseBody = { code, message, data, status };
    return responseBody;
  }
}
