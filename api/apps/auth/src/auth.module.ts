import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule, RabbitmqModule } from '@app/shared';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { RoleModule } from './role/role.module';
import { RoleEntity } from './role/role.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
    }),
    DatabaseModule.register([UserEntity, RoleEntity]),
    UserModule,
    JwtModule,
    RoleModule,
    RabbitmqModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
