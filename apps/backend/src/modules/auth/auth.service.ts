import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { User } from '../users/user.entity';
import { UsersService } from '../users';
import { UserLoginDto, TokenPayloadDto } from './dto';
import { ConfigService, UtilsService } from '../../shared/services';
import { ContextService } from '../../providers/context.service';
import { UserNotFoundException, NoContentException } from '../../exceptions';

@Injectable()
export class AuthService {
    private static _authUserKey = 'user_key';

    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly usersService: UsersService,
    ) {}

    async createToken(user: User): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME'),
            accessToken: await this.jwtService.signAsync({
                id: user.id,
            }),
        });
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<User> {
        const user = await this.usersService.findOne({
            email: userLoginDto.email,
        });
        const isPasswordValid = await UtilsService.validateHash(
            userLoginDto.password,
            user && user.password,
        );

        if (!user) {
            throw new UserNotFoundException();
        }
        if (user.password === '') {
            throw new NoContentException(
                `Password for user ${userLoginDto.email} is already reset`,
            );
        }
        if (!isPasswordValid) {
            throw new UserNotFoundException();
        }
        return user;
    }

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
