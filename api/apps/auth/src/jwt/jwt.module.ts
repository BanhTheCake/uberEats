import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule as JwtPackage } from '@nestjs/jwt';
import { JwtServices } from './jwt.services';
import { UserModule } from '../user/user.module';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { MicroservicesStrategy } from './strategy/microservices.strategy';

@Module({
  imports: [PassportModule, JwtPackage.register({}), UserModule],
  providers: [
    JwtServices,
    RefreshTokenStrategy,
    AccessTokenStrategy,
    MicroservicesStrategy,
  ],
  exports: [JwtServices],
})
export class JwtModule {}
