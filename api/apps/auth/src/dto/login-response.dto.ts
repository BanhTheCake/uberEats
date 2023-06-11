import { RegisterResponse } from './register-response';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    type: RegisterResponse,
    example: {
      id: '9b94926e-6348-4434-a4f9-de82ec766e45',
      firstName: 'Banh',
      lastName: 'TheFox',
      username: 'banhTheCake',
      created_at: '2023-06-11T04:22:09.323Z',
      updated_at: '2023-06-11T04:22:09.323Z',
    },
  })
  user: RegisterResponse;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiJlMGQ5NjQ1MS1lODk0LTQwYzctODRiMC03YzBmNWQ3ODFiMjQiLCJpYXQiOjE2ODY0NTc1MjYsImV4cCI6MTY4NjQ1ODQyNn0.LHT6JF_LUzkrsyI6Re0ol_hw7LLyR-fy7FgFmiprerU',
  })
  token: string;
}
