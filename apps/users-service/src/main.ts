import { NestFactory, Reflector } from '@nestjs/core';
import { UsersModule } from './app/users.module';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { HttpExceptionFilter, QueryFailedFilter } from '@smplct-view/shared/api';
import { Microservices } from '@smplct-view/shared/constants';
import { ConfigService } from '@smplct-view/shared/services';
import { getEnvPath } from '@smplct-view/shared/utils';
// Node.js crashes if there is an uncaught exception, while it does not crash if there is an 'unhandledRejection',
// i.e. a Promise without a .catch() handler. So we adding handler that prints the stacktrace and exits the
// process with an exit code of 1, just like any uncaught exception.
// https://www.npmjs.com/package/make-promises-safe
require('make-promises-safe');

const _config = new ConfigService(getEnvPath('users-service', process.env.NODE_ENV));

async function bootstrap() {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
    const NAME = Microservices.USERS_SERVICE;
    const opts = _config.getMicroserviceOptions(
        _config.microServicesMappings()[NAME].host,
        _config.microServicesMappings()[NAME].port,
    );
    const app = await NestFactory.createMicroservice(UsersModule, opts);
    const reflector = app.get(Reflector);
    app.useGlobalFilters(new HttpExceptionFilter(), new QueryFailedFilter(reflector));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
    app.listen(() =>
        Logger.log(
            `Microservice is listening at TCP: ${opts.options.host}:${opts.options.port}`,
            NAME,
        ),
    );
}

bootstrap();
