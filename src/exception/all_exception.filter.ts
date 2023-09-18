import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
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
    exception: BadRequestException | BaseException | HttpException,
  ): void {
    const exceptionConverted = ExceptionUtils.exceptionToMsgResponse(exception);

    const status: number = exceptionConverted.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const body: { code: number; message: string; data: any } = {
      code: exceptionConverted.code,
      message: exceptionConverted.message,
      data: exceptionConverted.data,
    };
    response.status(status).json(body);
  }

  catch(
    exception: BadRequestException | BaseException | HttpException,
    host: ArgumentsHost,
  ): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();
    this.handleMessage(exception);

    AllExceptionFilter.handleResponse(response, exception);
  }

  private handleMessage(
    exception: HttpException | QueryFailedError | Error | RpcException,
  ): void {
    this.logger.error(JSON.stringify(exception));
  }
}
