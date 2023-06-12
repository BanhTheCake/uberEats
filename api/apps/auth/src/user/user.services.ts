import { Injectable, BadRequestException } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { UserEntity } from './user.entity';
import * as argon from 'argon2';
import { RoleServices } from '../role/role.services';
import { ROLES } from '../role/roles.enum';
import { IUser } from './interface/user.interface';
import { UserRepository } from './user.repository';
import { UpdateRolesRequestDto } from './dto/update-roles-request.dto';

@Injectable()
export class UserServices {
  constructor(
    private userRepository: UserRepository,
    private roleServices: RoleServices,
  ) {}

  async findOne(data: FindOptionsWhere<UserEntity>): Promise<IUser | null> {
    return this.userRepository.findOneWithRoles({ where: data });
  }

  async createNewUser(data: DeepPartial<UserEntity>) {
    const role_user = await this.roleServices.findByRole(ROLES.SYSTEM_USER);
    await this.userRepository.createOne({
      ...data,
      roles: [role_user],
    });
    return this.userRepository.findOneWithRoles({
      where: { username: data.username },
    });
  }

  async comparePassword(username: string, password: string) {
    const hashPassword = (
      await this.userRepository.findOne({
        where: { username },
        select: { password: true },
      })
    ).password;
    return argon.verify(hashPassword, password);
  }

  async hash(password: string) {
    return argon.hash(password);
  }

  async update(id: string, data: DeepPartial<UserEntity>) {
    return this.userRepository.updateById(id, data);
  }

  async updateRoles(data: UpdateRolesRequestDto) {
    const currentUser = await this.userRepository.findOneWithRoles({
      where: { id: data.id },
    });
    const currentRole = await this.roleServices.findByRole(data.role);
    if (!currentUser || !currentRole) {
      throw new BadRequestException('User or role is not exist in database.');
    }
    const isHasRole = currentUser.roles.includes(currentRole.role);
    if (isHasRole) {
      throw new BadRequestException(`User already has role ${data.role}`);
    }
    await this.userRepository.updateRoleById(data.id, currentRole);
    return this.userRepository.findOneWithRoles({ where: { id: data.id } });
  }

  async find(data: FindManyOptions<UserEntity>) {
    return this.userRepository.findMany(data);
  }
}
