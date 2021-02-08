import { JwtModule } from '@nestjs/jwt';
import { Module, Global, HttpModule } from '@nestjs/common';
import { ConfigService, EventStoreService } from './shared/services';

const providers = [ConfigService, EventStoreService];

const _config = new ConfigService();

@Global()
@Module({
    providers,
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
    exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}
