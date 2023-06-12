import { Controller, Post, UseGuards } from '@nestjs/common';
import { RoleServices } from './role.services';
import { DeepPartial } from 'typeorm';
import { RoleEntity } from './role.entity';
import { ROLES } from './roles.enum';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from './decorator/role.decorator';
import { RolesGuard } from './guard/roles.guard';
import { AccessTokenGuard } from '../jwt/guard/access-token.guard';

@ApiTags('role')
@Controller('roles')
export class RoleController {
  constructor(private roleServices: RoleServices) {}

  @ApiOperation({ description: 'Create all roles.' })
  @ApiCreatedResponse({ description: 'Create success.' })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @ApiBadGatewayResponse({ description: 'Roles is duplicate.' })
  @ApiBearerAuth('JWT-auth')
  @Roles(ROLES.SYSTEM_ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post('seed')
  createAllRoles() {
    const data: DeepPartial<RoleEntity>[] = [
      { role: ROLES.SYSTEM_ADMIN },
      { role: ROLES.SYSTEM_USER },
    ];
    return this.roleServices.createMany(data);
  }
}
