import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users';
import { ConfigService } from '../../shared/services';
import { JWT_ERROR } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        public readonly configService: ConfigService,
        public readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET_KEY'),
            // if you want to use token with expiration date set false
            ignoreExpiration: true,
        });
    }

    async validate(payload: any, done) {
        const { iat, exp, id: userId } = payload;
        const timeDiff = exp - iat;

        if (timeDiff <= 0) {
            return done(new UnauthorizedException(JWT_ERROR), false);
        }
        const user = await this.usersService.findOne({ id: +userId });

        if (!user) {
            return done(new UnauthorizedException(JWT_ERROR), false);
        }
        return done(null, user);
    }
}
