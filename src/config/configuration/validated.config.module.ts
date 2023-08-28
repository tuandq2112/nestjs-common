import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import configuration from './env/configuration';
import fileConfig from './env/file.config';
import mongoConfig from './env/mongo.config';
import typeOrmConfig from './env/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      load: [mongoConfig, typeOrmConfig, fileConfig, configuration],
      isGlobal: true,
    }),
  ],
})
export class ValidatedConfigModule {}
