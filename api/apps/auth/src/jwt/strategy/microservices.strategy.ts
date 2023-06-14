import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserServices } from '../../user/user.services';
import { AccessTokenDto } from '../dto/accessToken.dto';

@Injectable()
export class MicroservicesStrategy extends PassportStrategy(
  Strategy,
  'microservices/accessToken',
) {
  constructor(
    configServices: ConfigService,
    private userServices: UserServices,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        MicroservicesStrategy.getToken,
      ]),
      ignoreExpiration: false,
      secretOrKey: configServices.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  static getToken(req: any) {
    return req.authentication;
  }

  async validate(payload: AccessTokenDto) {
    const user = await this.userServices.findOne({
      id: payload.id,
    });
    return user;
  }
}
