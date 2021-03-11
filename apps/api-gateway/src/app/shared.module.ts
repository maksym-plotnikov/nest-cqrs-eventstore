import { JwtModule } from '@nestjs/jwt';
import { Module, Global, HttpModule } from '@nestjs/common';
import { ConfigService } from '@cqrs-nest-app/shared/services';
import { getEnvPath } from '@cqrs-nest-app/shared/utils';

const _config = new ConfigService(getEnvPath('users-service', process.env.NODE_ENV));

@Global()
@Module({
    providers: [ConfigService],
    imports: [
        HttpModule,
        JwtModule.register({
            privateKey: _config.get('JWT_SECRET_KEY'),
            // if you want to use token with expiration date
            // signOptions: {
            //     expiresIn: 36000,
            // },
        }),
    ],
    exports: [ConfigService, HttpModule, JwtModule],
})
export class SharedModule {}
