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
  typeOrmDatabaseType: RequiredDatabaseType;
  @IsIP()
  typeOrmHost: string;
  @IsNumber()
  typeOrmPort: number;
  @IsOptional()
  typeOrmUsername: string;
  @IsOptional()
  typeOrmPassword: string;
  @IsString()
  typeOrmDatabase: string;
}
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const typeOrmConfig =
      this.configService.get<TypeOrmConfigVariables>('typeOrm');

    const validatedConfig = plainToInstance(
      TypeOrmConfigVariables,
      typeOrmConfig,
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
      type: typeOrmConfig.typeOrmDatabaseType,
      host: typeOrmConfig.typeOrmHost,
      port: typeOrmConfig.typeOrmPort,
      username: typeOrmConfig.typeOrmUsername,
      password: typeOrmConfig.typeOrmPassword,
      database: typeOrmConfig.typeOrmDatabase,
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
