import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserServices } from './user.services';
import { UserController } from './user.controller';
import { RoleModule } from '../role/role.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule],
  controllers: [UserController],
  providers: [UserServices, UserRepository],
  exports: [UserServices],
})
export class UserModule {}
