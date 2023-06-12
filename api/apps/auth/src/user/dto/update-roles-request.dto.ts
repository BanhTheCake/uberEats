import { ApiProperty } from '@nestjs/swagger';
import { ROLES } from '../../role/roles.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRolesRequestDto {
  @ApiProperty({
    example: '9b94926e-6348-4434-a4f9-de82ec766e45',
    description: 'Id of user want to update role.',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: 'system_user',
  })
  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}
