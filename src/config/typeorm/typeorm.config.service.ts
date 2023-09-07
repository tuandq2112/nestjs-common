import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import {
  IsIP,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
export type RequiredDatabaseType = 'mongodb' | 'mysql' | 'postgres';
class TypeOrmConfigVariables {
  @IsIn(['mongodb', 'mysql', 'postgres'])
  type: RequiredDatabaseType;
  @IsIP()
  host: string;
  @IsNumber()
  port: number;
  @IsOptional()
  username: string;
  @IsOptional()
  password: string;
  @IsString()
  database: string;
}
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const type = this.configService.get<RequiredDatabaseType>('DATABASE_TYPE');
    const host = this.configService.get<string>('DATABASE_HOST');
    const port = this.configService.get<number>('DATABASE_PORT');
    const username = this.configService.get<string>('DATABASE_USERNAME');
    const password = this.configService.get<string>('DATABASE_PASSWORD');
    const database = this.configService.get<string>('DATABASE_NAME');
    const validatedConfig = plainToInstance(
      TypeOrmConfigVariables,
      { type, host, port, username, password, database },
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
      type,
      host,
      port,
      username,
      password,
      database,
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
