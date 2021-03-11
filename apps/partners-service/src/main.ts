import { NestFactory, Reflector } from '@nestjs/core';
import { PartnersModule } from './app/partners.module';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from '@cqrs-nest-app/shared/api';
import { Microservices } from '@cqrs-nest-app/shared/constants';
import { ConfigService } from '@cqrs-nest-app/shared/services';
import { getEnvPath } from '@cqrs-nest-app/shared/utils';

const _config = new ConfigService(getEnvPath('users-service', process.env.NODE_ENV));

async function bootstrap() {
    const NAME = Microservices.PARTNERS_SERVICE;
    const opts = _config.getMicroserviceOptions(
        _config.microServicesMappings()[NAME].host,
        _config.microServicesMappings()[NAME].port,
    );
    const app = await NestFactory.createMicroservice(PartnersModule, opts);
    const reflector = app.get(Reflector);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
    app.listen(() =>
        Logger.log(
            `Microservice is listening at TCP: ${opts.options.host}:${opts.options.port}`,
            NAME,
        ),
    );
}

bootstrap();
