import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UsersService } from './modules/users';
import { USER_REQUEST_KEY } from '@smplct-view/shared/constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private usersService: UsersService) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest();
        req[USER_REQUEST_KEY] = await this.usersService.findOne(1);

        return true;
    }
}
