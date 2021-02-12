import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 8888,
        },
    });
    app.listen(() => Logger.log('USERS Microservice is listening at port: 8888'));
}
bootstrap();
