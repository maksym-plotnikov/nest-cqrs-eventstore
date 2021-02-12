import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../modules/users/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this._reflector.get<string[]>('roles', context.getHandler()) || [];

        const controllerRoles =
            this._reflector.get<string[]>('roles', context.getClass()) || [];

        if (controllerRoles.length !== 0) {
            roles.push(...controllerRoles);
        }

        if (roles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = <User>request.user;
        const hasRole = () => user.roles.some(role => roles.includes(role));

        const canProceed = user && user.roles && Array.isArray(user.roles) && hasRole();
        if (!canProceed) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
