import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ValidatedConfigModule } from '../config';
import { AllExceptionFilterModule } from '../exception';
import { JwtAuthGuard, JwtAuthModule } from '../guards';
import { LoggerModule } from '../logger';
import { TransformerModule } from '../transformer';
import { ValidatorModule } from '../validator';

@Module({
  imports: [
    LoggerModule,
    ValidatedConfigModule,
    ValidatorModule,
    AllExceptionFilterModule,
    TransformerModule,
    JwtAuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class HttpModule {}
