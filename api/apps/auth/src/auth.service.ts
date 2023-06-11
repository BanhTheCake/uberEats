import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { Response } from 'express';
import { RegisterRequestDto } from './dto/register-request.dto';
import { UserServices } from './user/user.services';
import { JwtServices } from './jwt/jwt.services';
import { cookiesConfig } from './config/cookies.config';
import { LogoutRequestDto } from './dto/logout-request.dto';
import { UserEntity } from './user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UserServices,
    private jwtServices: JwtServices,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login(data: LoginRequestDto, res: Response) {
    try {
      const existUser = await this.userServices.findOne({
        username: data.username,
      });
      if (!existUser) {
        throw new BadRequestException('Username or password is incorrect.');
      }
      const isValidPassword = await this.userServices.comparePassword(
        data.username,
        data.password,
      );
      if (!isValidPassword) {
        throw new BadRequestException('Username or password is incorrect.');
      }
      const accessToken = this.jwtServices.generateAccessToken({
        username: existUser.username,
        id: existUser.id,
      });
      const refreshToken = this.jwtServices.generateRefreshToken({
        username: existUser.username,
        id: existUser.id,
      });

      this.userServices.update(existUser.id, {
        refreshToken,
      });

      res.cookie('refreshToken', refreshToken, cookiesConfig);
      return {
        user: existUser,
        token: accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async register(data: RegisterRequestDto) {
    try {
      // Check is user has been exist in database
      const existUser = await this.userServices.findOne({
        username: data.username,
      });
      if (existUser) {
        throw new BadRequestException('User already exist.');
      }
      const hashPassword = await this.userServices.hash(data.password);
      return this.userServices.createNewUser({
        ...data,
        password: hashPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  async logout(data: LogoutRequestDto, res: Response) {
    try {
      const existUser = await this.userServices.findOne({ id: data.id });
      if (existUser) {
        this.userServices.update(existUser.id, { refreshToken: '' });
      }
      res.cookie('refreshToken', null, cookiesConfig);
      return 'Logout success.';
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(
    user: Omit<UserEntity, 'password' | 'refreshToken'>,
    res: Response,
  ) {
    try {
      const newRefreshToken = this.jwtServices.generateRefreshToken({
        id: user.id,
        username: user.username,
      });
      const newAccessToken = this.jwtServices.generateAccessToken({
        id: user.id,
        username: user.username,
      });
      this.userServices.update(user.id, { refreshToken: newRefreshToken });
      res.cookie('refreshToken', newRefreshToken, cookiesConfig);
      return {
        token: newAccessToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
