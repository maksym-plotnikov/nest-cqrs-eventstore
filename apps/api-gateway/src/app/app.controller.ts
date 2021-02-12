import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { of, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/ping-users')
    pingServiceA() {
        return this.appService.pingUsersService();
    }

    @Get('/ping-partners')
    pingServiceB() {
        return this.appService.pingPartnersService();
    }

    @Get('/ping-all')
    pingAll() {
        return zip(
            this.appService.pingUsersService(),
            this.appService.pingPartnersService(),
        ).pipe(
            map(([usersServiceResponse, partnersServiceResponse]) => ({
                usersServiceResponse,
                partnersServiceResponse,
            })),
            catchError(e => of(e)),
        );
    }
}
