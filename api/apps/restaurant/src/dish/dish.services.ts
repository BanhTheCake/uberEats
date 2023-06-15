import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DishEntity } from '../entity/dish.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateNewDishParamDto } from './dto/create-new-param.dto';
import { CreateNewDishBodyDto } from './dto/create-new-body.dto';
import { RestaurantEntity } from '../entity/restaurant.entity';
import { UpdateDishByIdParamDto } from './dto/update-dish-by-id-param.dto';
import { UpdateDishByIdBodyDto } from './dto/update-dish-by-id-body.dto';
import { DeleteDishByIdParamDto } from './dto/delete-dish-by-id-param.dto';
import { GetAllDishParamDto } from './dto/get-all-dish-param.dto';

@Injectable()
export class DishServices {
  constructor(
    @InjectRepository(DishEntity)
    private dishRepository: Repository<DishEntity>,
    @InjectRepository(RestaurantEntity)
    private restaRepository: Repository<RestaurantEntity>,
  ) {}

  async getAll(param: GetAllDishParamDto, onwerId: string) {
    try {
      // Get All Dish already deleted (https://stackoverflow.com/questions/66117005/typeorm-left-joining-without-deletedat-is-null)
      // const queryBuilder =
      //   this.restaRepository.createQueryBuilder('restaurant');
      // return queryBuilder
      //   .withDeleted()
      //   .leftJoinAndSelect('restaurant.dishes', 'dishes')
      //   .where('dishes.deleted_at is not null')
      //   .getOne();

      return this.restaRepository.findOne({
        where: { id: param.id, owner_id: onwerId },
        relations: {
          dishes: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createNew(
    param: CreateNewDishParamDto,
    data: CreateNewDishBodyDto,
    ownerId: string,
  ) {
    try {
      const restaurant = await this.restaRepository.findOne({
        where: { id: param.id, owner_id: ownerId },
      });
      if (!restaurant) {
        throw new BadRequestException('Restaurant is not exist.');
      }
      const dish = this.dishRepository.create({ ...data, restaurant });
      await this.dishRepository.save(dish);
      return this.dishRepository.findOne({
        where: { id: dish.id },
        relations: { restaurant: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateById(param: UpdateDishByIdParamDto, data: UpdateDishByIdBodyDto) {
    try {
      const currentDish = await this.dishRepository.findOne({
        where: {
          id: param.dish_id,
          restaurant: {
            id: param.id,
          },
        },
      });
      if (!currentDish) {
        throw new NotFoundException('Dish is not exist in restaurant.');
      }
      const updateDish = { ...currentDish, ...data };
      await this.dishRepository.save(updateDish);
      return updateDish;
    } catch (err) {
      throw err;
    }
  }

  async deleteById(param: DeleteDishByIdParamDto) {
    try {
      await this.dishRepository.softDelete({
        id: param.dish_id,
        restaurant: { id: param.id },
      });
      return 'Delete success.';
    } catch (error) {
      throw error;
    }
  }
}
