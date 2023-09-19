import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigService } from '../config/jwt/jwt_config.service';
import { FileModule } from '../storage/file.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    FileModule,
    JwtModule.registerAsync({
      imports: [PassportModule, ConfigModule, FileModule],
      useClass: JwtConfigService,
      global: true,
    }),
  ],
})
export class JwtAuthModule {}
