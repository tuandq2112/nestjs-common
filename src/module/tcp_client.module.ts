import { Module } from '@nestjs/common';
import { TypeOrmConfigModule, ValidatedConfigModule } from '../config';
import { RpcExceptionModule } from '../exception';
import { JwtAuthModule } from '../guards';
import { LoggerModule } from '../logger';
import { ValidatorModule } from '../validator';

@Module({
  imports: [
    LoggerModule,
    ValidatedConfigModule,
    ValidatorModule,
    TypeOrmConfigModule,
    RpcExceptionModule,
    JwtAuthModule,
  ],
})
export class TcpClientModule {}
