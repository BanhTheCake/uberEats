import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RestaServices } from './resta.services';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNewRequestDto } from './dto/create-new-request.dto';
import {
  CurrentUser,
  IUser,
  JwtAuthGuard,
  ROLES,
  Roles,
  RolesGuard,
} from '@app/shared';
import { CreateNewResponseDto } from './dto/create-new-response.dto';

@ApiTags('restaurants')
@Controller()
export class RestaController {
  constructor(private restaServices: RestaServices) {}

  @Roles(ROLES.RESTAURANT_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('hello')
  getHello() {
    return 'hello';
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreateNewResponseDto,
    description: 'Create new restaurant success.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @ApiBearerAuth('JWT-auth')
  @Post()
  createNewRestaurant(
    @Body() data: CreateNewRequestDto,
    @CurrentUser() user: IUser,
  ) {
    return this.restaServices.createNew(data, user.id);
  }
}
