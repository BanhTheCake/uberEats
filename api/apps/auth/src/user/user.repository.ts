import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from './interface/user.interface';
import { ROLES } from '../role/roles.enum';
import { RoleEntity } from '../role/role.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(options: FindOneOptions<UserEntity>) {
    return this.userRepository.findOne(options);
  }

  async findOneWithRoles(
    options: FindOneOptions<UserEntity>,
  ): Promise<IUser | null> {
    const user = await this.userRepository.findOne({
      ...options,
      relations: ['roles'],
    });
    if (!user) return null;
    if (user && user.roles.length !== 0) {
      const roles = [...user.roles];
      return {
        ...user,
        roles: roles.map((role) => role.role),
      };
    }
    return {
      ...user,
      roles: [],
    };
  }

  async findMany(data: FindManyOptions<UserEntity>) {
    return this.userRepository.find(data);
  }

  async createOne(data: DeepPartial<UserEntity>) {
    const newUser = this.userRepository.create(data);
    await this.userRepository.save(newUser);
  }

  async updateById(id: string, data: DeepPartial<UserEntity>) {
    return this.userRepository.update(
      {
        id,
      },
      data,
    );
  }

  async updateRoleById(id: string, role: RoleEntity) {
    const currentUser = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    currentUser.roles = [...currentUser.roles, role];
    await this.userRepository.save(currentUser);
  }
}
