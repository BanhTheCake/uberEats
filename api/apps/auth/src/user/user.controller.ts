import { Controller, Get, UseGuards, Put, Body } from '@nestjs/common';
import { UserServices } from './user.services';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { GetUserResponse } from './dto/get-all-response.dto';
import { AccessTokenGuard } from '../jwt/guard/access-token.guard';
import { CurrentUser } from '@app/shared';
import { IUser } from './interface/user.interface';
import { UpdateRolesRequestDto } from './dto/update-roles-request.dto';
import { RolesGuard } from '../role/guard/roles.guard';
import { Roles } from '../role/decorator/role.decorator';
import { ROLES } from '../role/roles.enum';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userServices: UserServices) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ description: 'Get all users.' })
  @ApiOkResponse({ type: [GetUserResponse], description: 'Get success.' })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @Roles(ROLES.SYSTEM_ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  getAllUsers() {
    return this.userServices.find({ relations: ['roles'] });
  }

  @ApiOperation({ description: 'Update role for specify user.' })
  @ApiOkResponse({ description: 'Update role success.' })
  @ApiBadRequestResponse({
    description: 'User or role is not exist in database',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(ROLES.SYSTEM_ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put('role')
  updateRoles(@Body() data: UpdateRolesRequestDto) {
    return this.userServices.updateRoles(data);
  }
}
