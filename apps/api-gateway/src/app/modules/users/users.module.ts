import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@cqrs-nest-app/shared/services';
import { getEnvPath } from '@cqrs-nest-app/shared/utils';

const _config = new ConfigService(getEnvPath('api-gateway', process.env.NODE_ENV));

@Module({
    imports: [ClientsModule.register(_config.microServicesConfig)],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [],
})
export class UsersModule {}
