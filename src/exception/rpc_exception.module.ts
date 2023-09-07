import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Logger } from 'winston';
import { LoggerModule } from '../logger/logger.module';
import { RpcExceptionInterceptor } from './rpc_exception.interceptor';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
    Logger,
  ],
})
export class RpcExceptionModule {}
