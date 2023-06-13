import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({
  name: 'restaurant',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  cuisine: string;

  @Column()
  contact_number: string;

  @Column()
  open_at: string;

  @Column()
  close_at: string;

  @Column()
  delivery_option: string;

  @Column()
  pickup_option: string;

  @Column({ type: 'jsonb', array: false, default: () => "'[]'" })
  image_url: Array<string>;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
