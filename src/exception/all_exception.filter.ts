import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ExceptionUtils } from '../utils/exception.utils';
import { BaseException } from './base.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  private static handleResponse(
    response: Response,
    exception: HttpException | QueryFailedError | Error | BaseException,
  ): void {
    const [responseBody, status] =
      ExceptionUtils.exceptionToMsgResponse(exception);
    response.status(status).json(responseBody);
  }

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();

    // Handling error message and logging
    this.handleMessage(exception);

    // Response to client
    AllExceptionFilter.handleResponse(response, exception);
  }

  private handleMessage(
    exception: HttpException | QueryFailedError | Error | RpcException,
  ): void {
    const message = ExceptionUtils.exactMessageFromException(exception);

    this.logger.error(message);
  }
}
