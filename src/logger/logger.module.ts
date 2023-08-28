import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { FileModule } from '../storage/file.module';
import { WinstonServiceConfig } from './winston.service';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule, FileModule],
      useClass: WinstonServiceConfig,
    }),
  ],
})
export class LoggerModule {}
