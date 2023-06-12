import { Module } from '@nestjs/common';
import { RoleServices } from './role.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { RoleController } from './role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleServices],
  exports: [RoleServices],
})
export class RoleModule {}
