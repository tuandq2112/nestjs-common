import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FileService } from '../storage/';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async () => {
        try {
          const publicKeyStone =
            this.configService.get<string>('PUBLIC_KEY_STORE');

          const publicKey = await this.fileService.readFile(publicKeyStone);

          return publicKey;
        } catch (error) {
          throw new UnauthorizedException("Can't found public key");
        }
      },
    });
  }

  async validate(...[args]): Promise<any> {
    console.log(args);
  }
}
