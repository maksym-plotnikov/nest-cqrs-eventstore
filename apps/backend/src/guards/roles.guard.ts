import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../modules/users/user.entity';
import { RoleType } from '@smplct-view/shared/constants';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const role =
            this._reflector.get<string>('role', context.getHandler()) || RoleType.User;

        if (!role) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = <User>request.user;
        const hasRole = () => user.role === role;

        const canProceed = user && user.role && hasRole();
        if (!canProceed) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
