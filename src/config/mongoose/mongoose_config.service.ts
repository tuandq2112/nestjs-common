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
  host: string;
  @IsNumber()
  port: number;
  @IsOptional()
  user: string;
  @IsOptional()
  pass: string;
  @IsString()
  database: string;
}
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const host = this.configService.get<string>('MONGO_HOST');
    const port = this.configService.get<string>('MONGO_PORT');
    const user = this.configService.get<string>('MONGO_USER');
    const pass = this.configService.get<string>('MONGO_PASS');
    const database = this.configService.get<string>('MONGO_DATABASE');

    const validatedConfig = plainToInstance(
      MongoConfigVariables,
      { host, port, user, pass, database },
      {
        enableImplicitConversion: true,
      },
    );
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return {
      uri: `mongodb://${host}/${port}/${database}`,
      user: user,
      pass: pass,
    };
  }
}
