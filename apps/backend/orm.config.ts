import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const port = (process.env.POSTGRES_PORT as never) || 5434;
const host = (process.env.POSTGRES_HOST as never) || 'localhost';
const username = (process.env.POSTGRES_USERNAME as never) || 'root';
const password = (process.env.POSTGRES_PASSWORD as never) || 'root';
const database = (process.env.POSTGRES_DATABASE as never) || 'email_admin';

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
    entities: ['../../apps/api/app/**/*.entity{.ts,.js}'],
    migrations: ['../../apps/api/app/database/migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: '../../apps/api/app/database/migrations',
        entitiesDir: '../../apps/api/app/**/*.entity{.ts,.js}',
    },
};
