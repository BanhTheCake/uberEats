import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { ROLES } from './roles.enum';
import { UserEntity } from '../user/user.entity';

@Entity({
  name: 'role',
})
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.SYSTEM_USER,
    unique: true,
  })
  role: ROLES;

  @ManyToMany((type) => UserEntity, (user) => user.roles)
  users: UserEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
