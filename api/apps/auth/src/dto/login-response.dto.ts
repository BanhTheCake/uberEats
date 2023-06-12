import { ROLES } from '../role/roles.enum';
import { RegisterResponse } from './register-response';
import { ApiProperty } from '@nestjs/swagger';

export class UserWithRoles extends RegisterResponse {
  @ApiProperty({
    example: [ROLES.SYSTEM_ADMIN, ROLES.SYSTEM_USER],
  })
  roles: ROLES[];
}

export class LoginResponse {
  @ApiProperty({
    type: UserWithRoles,
    example: {
      id: '9b94926e-6348-4434-a4f9-de82ec766e45',
      firstName: 'Banh',
      lastName: 'TheNight',
      username: 'banhTheCake',
      created_at: '2023-06-11T04:22:09.323Z',
      updated_at: '2023-06-11T04:22:09.323Z',
      roles: [ROLES.SYSTEM_ADMIN, ROLES.SYSTEM_USER],
    },
  })
  user: UserWithRoles;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiJlMGQ5NjQ1MS1lODk0LTQwYzctODRiMC03YzBmNWQ3ODFiMjQiLCJpYXQiOjE2ODY0NTc1MjYsImV4cCI6MTY4NjQ1ODQyNn0.LHT6JF_LUzkrsyI6Re0ol_hw7LLyR-fy7FgFmiprerU',
  })
  token: string;
}
