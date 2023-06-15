import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Entity({
  name: 'dish',
})
export class DishEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'integer' })
  price: number;

  @Column()
  category: string;

  @Column()
  food_type: string;

  @Column({ type: 'jsonb', array: false, default: () => "'[]'" })
  ingredients: string[];

  @Column({ type: 'jsonb', array: false, default: () => "'[]'" })
  thumbnails: string[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

  @ManyToOne((type) => RestaurantEntity, (restaurant) => restaurant.dishes)
  restaurant: RestaurantEntity;
}
