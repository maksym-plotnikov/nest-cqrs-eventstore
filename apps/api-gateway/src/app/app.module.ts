import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule } from '@nestjs/microservices';
import { UsersModule } from './modules/users/users.module';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { SharedModule } from './shared.module';
import { ConfigService } from '@smplct-view/shared/services';
import { getEnvPath } from '@smplct-view/shared/utils';

const _config = new ConfigService(getEnvPath('api-gateway', process.env.NODE_ENV));

@Module({
    imports: [
        ClientsModule.register(_config.microServicesConfig),
        UsersModule,
        SharedModule,
        WinstonModule.forRoot(_config.logConfig),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
