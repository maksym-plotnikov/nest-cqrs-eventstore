import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { ContextService } from '../../providers/context.service';

@Injectable()
export class AuthService {
    private static _authUserKey = 'user_key';

    constructor(public readonly jwtService: JwtService) {}

    setAuthUser(user: User) {
        return AuthService.setAuthUser(user);
    }

    getAuthUser() {
        return AuthService.getAuthUser();
    }

    static setAuthUser(user: User) {
        ContextService.set(AuthService._authUserKey, user);
    }

    static getAuthUser(): User {
        return ContextService.get(AuthService._authUserKey);
    }
}
