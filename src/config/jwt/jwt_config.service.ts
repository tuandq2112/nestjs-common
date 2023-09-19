import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { FileService } from '../../storage/file.service';
@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
  ) {}
  async createJwtOptions(): Promise<JwtModuleOptions> {
    const publicKeyStone = this.configService.get<string>('PUBLIC_KEY_STORE');
    const privateKeyStone = this.configService.get<string>('PRIVATE_KEY_STORE');
    const duration = this.configService.get<string>('JWT_DURATION');

    const publicKey = await this.fileService.readFile(publicKeyStone);
    const privateKey = await this.fileService.readFile(privateKeyStone);

    return {
      global: true,
      publicKey,
      privateKey,
      signOptions: {
        algorithm: 'RS256',
        expiresIn: duration,
      },
    };
  }
}
