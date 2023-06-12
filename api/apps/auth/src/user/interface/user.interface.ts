import { UserEntity } from '../user.entity';

export interface IUser extends Omit<UserEntity, 'roles'> {
  roles: string[];
}
