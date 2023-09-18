import { Logger, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { FileModule } from '../storage/file.module';
import { RequestLoggingInterceptor } from './request-logging.interceptor';
import { WinstonServiceConfig } from './winston.service';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule, FileModule],
      useClass: WinstonServiceConfig,
    }),
  ],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
  ],
  exports: [Logger],
})
export class LoggerModule {}
