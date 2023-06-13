import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantService {
  getHello(): string {
    return 'Hello World!';
  }
}
