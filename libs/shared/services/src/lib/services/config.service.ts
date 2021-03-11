import { Injectable, Optional, Inject } from '@nestjs/common';
import { ClientsModuleOptions, TcpOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as winston from 'winston';
import { join } from 'path';
import { Microservices } from '@cqrs-nest-app/shared/constants';

@Injectable()
export class ConfigService {
    constructor(@Optional() @Inject('ENV_PATH') private path: string) {
        const nodeEnv = this.nodeEnv;
        dotenv.config({
            path: path || join(__dirname, `/.${nodeEnv}.env`),
        });
        // Replace \\n with \n to support multiline strings in AWS
        for (const envName of Object.keys(process.env)) {
            process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
        }
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

    public getMicroserviceOptions(host: string, port: number): TcpOptions {
        return {
            transport: Transport.TCP,
            options: {
                host,
                port,
            },
        };
    }

    get logConfig() {
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

    microServicesMappings() {
        return {
            USERS_SERVICE: { host: '127.0.0.1', port: 8888 },
            PARTNERS_SERVICE: { host: '127.0.0.1', port: 8889 },
        };
    }

    get microServicesConfig(): ClientsModuleOptions {
        return [Microservices.USERS_SERVICE, Microservices.PARTNERS_SERVICE].map(
            name => ({
                name,
                transport: Transport.TCP,
                options: {
                    host: this.microServicesMappings()[name].host,
                    port: this.microServicesMappings()[name].port,
                },
            }),
        );
    }
}
