import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserServices } from '../../user/user.services';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { UserEntity } from '../../user/user.entity';
import { IUser } from '../../user/interface/user.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(
    configServices: ConfigService,
    private userServices: UserServices,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.getTokenFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: configServices.get<string>('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  static getTokenFromCookie(req: Request) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    return refreshToken;
  }

  async validateToken(token: string): Promise<[IUser, boolean]> {
    const user = await this.userServices.findOne({ refreshToken: token });
    if (user) {
      return [user, false];
    }
    return [null, true];
  }

  async validate(req: Request, payload: RefreshTokenDto) {
    const token = req.cookies['refreshToken'];
    const [user, isExpire] = await this.validateToken(token);
    if (isExpire) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
