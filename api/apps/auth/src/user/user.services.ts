import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { UserEntity } from './user.entity';
import * as argon from 'argon2';

@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(data: FindOptionsWhere<UserEntity>) {
    return this.userRepository.findOne({
      where: data,
    });
  }

  async createNewUser(data: DeepPartial<UserEntity>) {
    const newUser = this.userRepository.create(data);
    await this.userRepository.save(newUser);
    return this.userRepository.findOne({
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
    return this.userRepository.update(
      {
        id,
      },
      data,
    );
  }
}
