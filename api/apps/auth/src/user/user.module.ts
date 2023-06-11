import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserServices } from './user.services';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModule {}
