import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserServices } from '../../user/user.services';
import { AccessTokenDto } from '../dto/accessToken.dto';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(
    configServices: ConfigService,
    private userServices: UserServices,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configServices.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: AccessTokenDto) {
    const user = await this.userServices.findOne({
      id: payload.id,
    });
    return user;
  }
}
