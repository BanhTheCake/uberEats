import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { DishEntity } from './dish.entity';
import { RestaurantAddressEntity } from './restaurant_adress.entity';

@Entity({
  name: 'restaurant',
})
export class RestaurantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, select: true })
  public name!: string;

  @Column({ type: 'varchar', default: null })
  public description!: string;

  @Column({ type: 'uuid' })
  public owner_id!: string;

  @Column({ type: 'varchar', default: null })
  public website_url!: string;

  @Column({ type: 'jsonb', default: null })
  public social_links!: any;

  @Column({ type: 'varchar', default: null })
  public cuisine!: string;

  @Column({ type: 'int', default: null })
  public average_price!: number;

  @Column({ type: 'int', default: null })
  public average_rating!: number;

  @Column({ type: 'varchar' })
  public latitude!: string;

  @Column({ type: 'boolean', default: true })
  public is_available!: string;

  @Column({ type: 'varchar' })
  public longitude!: string;

  @Column({ type: 'varchar', default: null })
  public contact_no!: string;

  @Column({ type: 'varchar', default: null })
  public banner!: string;

  @Column({ type: 'varchar', default: null })
  public delivery_options!: string;

  @Column({ type: 'varchar' })
  public pickup_options!: string;

  @Column({ type: 'varchar' })
  public opens_at!: string;

  @Column({ type: 'varchar' })
  public closes_at!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, select: false })
  delete_at: Date;

  @OneToMany((type) => DishEntity, (dish) => dish.restaurant)
  dishes: DishEntity[];

  @OneToOne((type) => RestaurantAddressEntity, (address) => address.restaurant)
  address: RestaurantAddressEntity;
}
