import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { contextMiddleware } from './middlewares';
import { ConfigService } from './shared/services';
import { AuthModule } from './modules/auth/auth.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { UsersModule } from './modules/users/users.module';
import { WinstonModule } from 'nest-winston';
import { SharedModule } from './shared.module';

@Module({
    imports: [
        AuthModule,
        CompaniesModule,
        UsersModule,
        SharedModule,
        WinstonModule.forRootAsync({
            useFactory: (configService: ConfigService) => configService.logConfig(),
            inject: [ConfigService],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                ...configService.typeOrmConfig,
                entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
