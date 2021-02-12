import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, timeout } from 'rxjs/operators';

@Injectable()
export class AppService {
    constructor(
        @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
        @Inject('PARTNERS_SERVICE') private readonly partnersService: ClientProxy,
    ) {}

    pingUsersService() {
        const startTs = Date.now();
        const pattern = { cmd: 'ping' };
        const payload = {};
        return this.usersService
            .send<string>(pattern, payload)
            .pipe(
                map((message: string) => ({ message, duration: Date.now() - startTs })),
                timeout(5000),
            )
            .toPromise();
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
