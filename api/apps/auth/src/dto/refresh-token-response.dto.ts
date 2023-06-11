import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiJlMGQ5NjQ1MS1lODk0LTQwYzctODRiMC03YzBmNWQ3ODFiMjQiLCJpYXQiOjE2ODY0NTc1MjYsImV4cCI6MTY4NjQ1ODQyNn0.LHT6JF_LUzkrsyI6Re0ol_hw7LLyR-fy7FgFmiprerU',
  })
  token: string;
}
