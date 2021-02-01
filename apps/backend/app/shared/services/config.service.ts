import * as dotenv from 'dotenv';
import * as winston from 'winston';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ConfigService {
    constructor() {
        const nodeEnv = this.nodeEnv;
        dotenv.config({
            path: `./apps/api/.${nodeEnv}.env`,
        });
        // Replace \\n with \n to support multiline strings in AWS
        for (const envName of Object.keys(process.env)) {
            process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
        }
        // console.info(process.env);
    }

    public getNodeEnv(): string {
        return this.nodeEnv;
    }

    public get(key: string): string {
        return process.env[key];
    }

    public getNumber(key: string): number {
        return Number(this.get(key));
    }

    public logConfig() {
        const logFile = `${__dirname}/logs/app.log`;
        const exceptionsFile = `${__dirname}/logs/exceptions.log`;
        return {
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(
                    i =>
                        `timestamp=${i.timestamp} level=${i.level} application=${this.get(
                            'APPLICATION_NAME',
                        )}: ${i.message}`,
                ),
            ),
            transports: [
                new winston.transports.File(<any>{
                    level: this.get('LOG_LEVEL'),
                    filename: logFile,
                    handleExceptions: false,
                    json: true,
                    maxsize: 5242880, // 5MB
                    maxFiles: 5,
                    colorize: false,
                }),
                new winston.transports.Console(<any>{
                    level: this.get('LOG_LEVEL'),
                    handleExceptions: true,
                    json: true,
                    colorize: true,
                }),
            ],
            exceptionHandlers: [
                new winston.transports.File(<any>{
                    filename: exceptionsFile,
                    json: true,
                    maxsize: 5242880, // 5MB
                    maxFiles: 5,
                    colorize: false,
                }),
            ],
            exitOnError: false, // do not exit on handled exceptions
        };
    }

    get nodeEnv(): string {
        return this.get('NODE_ENV') || 'development';
    }

    get typeOrmConfig(): TypeOrmModuleOptions {
        const entities = [__dirname + '/apps/api/app/**/*.entity{.ts,.js}'];
        const migrations = [__dirname + '/apps/api/app/database/migrations/*{.ts,.js}'];

        return {
            entities,
            migrations,
            keepConnectionAlive: true,
            type: 'postgres',
            host: this.get('POSTGRES_HOST'),
            port: this.getNumber('POSTGRES_PORT'),
            username: this.get('POSTGRES_USERNAME'),
            password: this.get('POSTGRES_PASSWORD'),
            database: this.get('POSTGRES_DATABASE'),
            migrationsRun: true,
            logging: ['query', 'error', 'warn'],
            // namingStrategy: new SnakeNamingStrategy(),
        };
    }
}
