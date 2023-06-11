import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as JwtPackageServices } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/accessToken.dto';
import { validateEnv } from '@app/shared';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class JwtServices {
  constructor(
    private JwtPS: JwtPackageServices,
    private configServices: ConfigService,
  ) {}

  generateAccessToken(data: AccessTokenDto) {
    const [ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES] = validateEnv(
      ['ACCESS_TOKEN_SECRET', 'ACCESS_TOKEN_EXPIRES'],
      this.configServices,
    );
    return this.JwtPS.sign(data, {
      secret: ACCESS_TOKEN_SECRET,
      expiresIn: ACCESS_TOKEN_EXPIRES,
    });
  }

  generateRefreshToken(data: RefreshTokenDto) {
    const [REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES] = validateEnv(
      ['REFRESH_TOKEN_SECRET', 'REFRESH_TOKEN_EXPIRES'],
      this.configServices,
    );
    return this.JwtPS.sign(data, {
      secret: REFRESH_TOKEN_SECRET,
      expiresIn: REFRESH_TOKEN_EXPIRES,
    });
  }
}
