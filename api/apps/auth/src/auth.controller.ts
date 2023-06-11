import { Controller, Get, Res, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterResponse } from './dto/register-response';
import { LoginResponse } from './dto/login-response.dto';
import { LogoutRequestDto } from './dto/logout-request.dto';
import { RefreshTokenGuard } from './jwt/guard/refresh-token.guard';
import { CurrentUser } from '@app/shared';
import { UserEntity } from './user/user.entity';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(RefreshTokenGuard)
  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @ApiOperation({
    description: 'Login account.',
  })
  @ApiOkResponse({
    type: LoginResponse,
    description: 'Login success.',
  })
  @ApiBadRequestResponse({
    description: 'Username or password is incorrect.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @Post('login')
  login(
    @Body() data: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(data, res);
  }

  @ApiOperation({
    description: 'Register new account for user',
  })
  @ApiOkResponse({
    type: RegisterResponse,
    description: 'Create new user success.',
  })
  @ApiBadRequestResponse({
    description: 'User already exist.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @Post('register')
  register(@Body() data: RegisterRequestDto) {
    return this.authService.register(data);
  }

  @ApiOperation({ description: 'Logout user by id' })
  @ApiOkResponse({ description: 'Logout success.' })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @Post('logout')
  logout(
    @Body() data: LogoutRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(data, res);
  }

  @ApiOperation({
    description:
      'Refresh your access token when expire. Your must login to use',
  })
  @ApiOkResponse({
    type: RefreshTokenResponseDto,
    description: 'Refresh token success.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong with server.',
  })
  @UseGuards(RefreshTokenGuard)
  @Get('refreshToken')
  refreshToken(
    @CurrentUser() user: Omit<UserEntity, 'password' | 'refreshToken'>,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(user, res);
  }
}
