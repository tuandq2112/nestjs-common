import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import {
  IsIP,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

class MongoConfigVariables {
  @IsIP()
  mongoHost: string;
  @IsNumber()
  mongoPort: number;
  @IsOptional()
  mongoUser: string;
  @IsOptional()
  mongoPass: string;
  @IsString()
  mongoDatabase: string;
}
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const mongoConfig = this.configService.get<MongoConfigVariables>('mongo');

    const validatedConfig = plainToInstance(MongoConfigVariables, mongoConfig, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return {
      uri: `mongodb://${mongoConfig.mongoHost}/${mongoConfig.mongoPort}/${mongoConfig.mongoDatabase}`,
      user: mongoConfig.mongoUser,
      pass: mongoConfig.mongoPass,
    };
  }
}
