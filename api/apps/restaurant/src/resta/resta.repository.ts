import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantEntity } from '../entity/restaurant.entity';

@Injectable()
export class RestaRepository {
  constructor(
    @InjectRepository(RestaurantEntity)
    private restaRepository: Repository<RestaurantEntity>,
  ) {}

  async createOne(data: DeepPartial<RestaurantEntity>) {
    const newRestaurant = this.restaRepository.create(data);
    await this.restaRepository.save(newRestaurant);
    return this.restaRepository.findOne({ where: { id: newRestaurant.id } });
  }
}
