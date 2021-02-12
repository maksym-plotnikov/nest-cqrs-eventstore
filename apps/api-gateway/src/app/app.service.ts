import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
    constructor(
        @Inject('USERS_SERVICE') private readonly usersServiceA: ClientProxy,
        @Inject('PARTNERS_SERVICE') private readonly partnersService: ClientProxy,
    ) {}

    pingUsersService() {
        const startTs = Date.now();
        const pattern = { cmd: 'ping' };
        const payload = {};
        return this.usersServiceA
            .send<string>(pattern, payload)
            .pipe(
                map((message: string) => ({ message, duration: Date.now() - startTs })),
            );
    }

    pingPartnersService() {
        const startTs = Date.now();
        const pattern = { cmd: 'ping' };
        const payload = {};
        return this.partnersService
            .send<string>(pattern, payload)
            .pipe(
                map((message: string) => ({ message, duration: Date.now() - startTs })),
            );
    }
}
