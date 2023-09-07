import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigService } from '../config/jwt/jwt_config.service';
import { FileModule } from '../storage/file.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt_auth.guards';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    FileModule,
    JwtModule.registerAsync({
      imports: [PassportModule, ConfigModule, FileModule],
      useClass: JwtConfigService,
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class JwtAuthModule {}
