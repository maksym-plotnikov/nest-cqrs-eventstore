import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const port = (process.env.POSTGRES_PORT as never) || 5454;
const host = (process.env.POSTGRES_HOST as never) || 'localhost';
const username = (process.env.POSTGRES_USERNAME as never) || 'root';
const password = (process.env.POSTGRES_PASSWORD as never) || 'root';
const database = (process.env.POSTGRES_DATABASE as never) || 'smplct_view_app';

export const withCache: TypeOrmModuleOptions = {
    type: 'postgres',
    port,
    host,
    username,
    password,
    database,
    synchronize: false,
    keepConnectionAlive: true,
    cache: {
        type: 'redis',
        options: {
            host: '127.0.0.1',
            port: 6399,
        },
    },
    logging: ['query', 'error', 'warn'],
    entities: ['../../apps/backend/src/**/*.entity{.ts,.js}'],
    migrations: ['../../apps/backend/src/database/migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: '../../apps/backend/src/database/migrations',
        entitiesDir: '../../apps/backend/src/**/*.entity{.ts,.js}',
    },
};