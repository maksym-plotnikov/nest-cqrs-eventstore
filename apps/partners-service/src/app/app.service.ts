import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
    respond(): Observable<number> {
        return of(Math.floor(Math.random() * (999 - 100 + 1) + 100));
    }
}
