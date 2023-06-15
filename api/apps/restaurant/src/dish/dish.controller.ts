import {
  Controller,
  Param,
  Body,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DishServices } from './dish.services';
import {
  CurrentUser,
  IUser,
  JwtAuthGuard,
  ROLES,
  Roles,
  RolesGuard,
} from '@app/shared';
import { CreateNewDishParamDto } from './dto/create-new-param.dto';
import { CreateNewDishBodyDto } from './dto/create-new-body.dto';
import { UpdateDishByIdParamDto } from './dto/update-dish-by-id-param.dto';
import { UpdateDishByIdBodyDto } from './dto/update-dish-by-id-body.dto';
import { DeleteDishByIdParamDto } from './dto/delete-dish-by-id-param.dto';
import { GetAllDishParamDto } from './dto/get-all-dish-param.dto';

@ApiTags('Dishes')
@Controller()
export class DishController {
  constructor(private dishServices: DishServices) {}

  @HttpCode(HttpStatus.OK)
  @Roles(ROLES.RESTAURANT_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ description: 'Get all dish in restaurant.' })
  @ApiOkResponse({ description: 'Get all dish success.' })
  @ApiBadRequestResponse({ description: 'Restaurant is not exist.' })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @Get('/:id/dishes')
  getAllDish(@Param() param: GetAllDishParamDto, @CurrentUser() user: IUser) {
    return this.dishServices.getAll(param, user.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(ROLES.RESTAURANT_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ description: 'Create new dish in current restaurant.' })
  @ApiCreatedResponse({ description: 'Create new dish success.' })
  @ApiBadRequestResponse({ description: 'Restaurant is not exist.' })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @Post('/:id/dishes')
  createNewDish(
    @Param() param: CreateNewDishParamDto,
    @Body() data: CreateNewDishBodyDto,
    @CurrentUser() user: IUser,
  ) {
    return this.dishServices.createNew(param, data, user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(ROLES.SYSTEM_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ description: 'Update current dish in specify restaurant.' })
  @ApiOkResponse({ description: 'Update success.' })
  @ApiNotFoundResponse({ description: 'Dish is not exist.' })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @Put('/:id/dishes/:dish_id')
  updateDishById(
    @Param() param: UpdateDishByIdParamDto,
    @Body() data: UpdateDishByIdBodyDto,
  ) {
    return this.dishServices.updateById(param, data);
  }

  @Roles(ROLES.RESTAURANT_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ description: 'Delete current dish in restaurant.' })
  @ApiOkResponse({ description: 'Delete success.' })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @Delete('/:id/dishes/:dish_id')
  deleteDishById(@Param() param: DeleteDishByIdParamDto) {
    return this.dishServices.deleteById(param);
  }
}
