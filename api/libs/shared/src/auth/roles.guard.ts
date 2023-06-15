import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { IUser } from './auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const user = this.getUserFromContext(context);
    if (!user) return true;
    return requiredRoles.some((role) => user.roles?.includes(role));
  }

  getUserFromContext(context: ExecutionContext): IUser | null {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      return request.user;
    }
    if (context.getType() === 'rpc') {
      const data = context.switchToRpc().getData();
      return data.user;
    }
    return null;
  }
}
