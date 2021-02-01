import { Observable } from 'rxjs';
import {
    ExecutionContext,
    Injectable,
    NestInterceptor,
    CallHandler,
} from '@nestjs/common';

import { User } from '../modules/users/user.entity';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        const user = <User>request.user;
        AuthService.setAuthUser(user);

        return next.handle();
    }
}
