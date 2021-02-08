import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as clc from 'cli-color';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as RateLimit from 'express-rate-limit';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';
import { SharedModule } from './src/shared.module';
import { ConfigService } from './src/shared/services';
import { USER_REQUEST_KEY } from '@smplct-view/shared/constants';
import { QueryFailedFilter, HttpExceptionFilter } from './src/filters';
import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
// Important: load config before (!!!) you import AppModule
// https://github.com/nestjsx/crud/wiki/Controllers#global-options
CrudConfigService.load({
    auth: {
        property: USER_REQUEST_KEY,
    },
    routes: {
        exclude: ['createManyBase'],
    },
});
import { AppModule } from './src/app.module';
// Node.js crashes if there is an uncaught exception, while it does not crash if there is an 'unhandledRejection',
// i.e. a Promise without a .catch() handler. So we adding handler that prints the stacktrace and exits the
// process with an exit code of 1, just like any uncaught exception.
// https://www.npmjs.com/package/make-promises-safe
require('make-promises-safe');

async function bootstrap() {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(),
    );
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.enableCors();
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    app.use(
        helmet({
            contentSecurityPolicy: false,
        }),
    );
    app.use(
        RateLimit({
            skipSuccessfulRequests: true,
            windowMs: 60000, // 1 minute
            max: 300, // limit each IP to 300 requests per windowMs
        }),
    );
    app.use(compression());

    const configService = app.select(SharedModule).get(ConfigService);

    const reflector = app.get(Reflector);
    app.useGlobalFilters(new HttpExceptionFilter(), new QueryFailedFilter(reflector));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    const globalPrefix = 'v1';
    app.setGlobalPrefix(globalPrefix);

    if (['development'].includes(configService.nodeEnv)) {
        app.use(morgan('combined'));
        const options = new DocumentBuilder()
            .setTitle('Simplicity VIEW API')
            .setDescription('API Documentation')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, options, {
            ignoreGlobalPrefix: false,
        });
        SwaggerModule.setup('docs', app, document);
    }

    const port = process.env.PORT || 3333;
    await app.listen(port, () => {
        Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
    });
}

bootstrap().then(() => console.info(clc.black.bgWhite('  --- API IS READY ---  ')));
