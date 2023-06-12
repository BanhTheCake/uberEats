import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { DeepPartial, Repository, QueryFailedError } from 'typeorm';
import { ROLES } from './roles.enum';

@Injectable()
export class RoleServices {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async createMany(data: DeepPartial<RoleEntity>[]) {
    try {
      const queryBuilder = this.roleRepository.createQueryBuilder('role');
      await queryBuilder.insert().values(data).execute();
      return 'Create roles success.';
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async findByRole(role: ROLES) {
    return this.roleRepository
      .createQueryBuilder('roles')
      .where('roles.role = :roleName', { roleName: role })
      .getOne();
  }
}
