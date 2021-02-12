import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class AppService {
    respond(): Observable<string> {
        return of('pong').pipe(delay(1000));
    }
}
