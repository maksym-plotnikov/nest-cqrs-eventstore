import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
    respond(): Observable<string> {
        return of('pong').pipe();
    }
}
