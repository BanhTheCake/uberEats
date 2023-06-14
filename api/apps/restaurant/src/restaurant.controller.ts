import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { ClientProxy } from '@nestjs/microservices';
import { CurrentUser, JwtAuthGuard } from '@app/shared';

@Controller()
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    @Inject('AUTH_SERVICES') private microservices: ClientProxy,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@CurrentUser() user: any): string {
    return JSON.stringify(user);
  }
}
