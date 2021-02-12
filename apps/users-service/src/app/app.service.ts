import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
    async respond(): Promise<Observable<string>> {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(4500);
        return of('pong');
    }
}
