import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ICommand, ofType } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/impl/user-created.event';
import { WelcomeUserCommand } from '../commands/impl/welcome-user.command';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class UsersSagas {
    userCreated = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserCreatedEvent),
            delay(1000),
            map(event => {
                Logger.log('Inside [UsersSagas] Saga', 'UsersSagas');
                // const userId = event.userDto[0].userId[0];
                console.info(event);
                return new WelcomeUserCommand('1');
            }),
        );
    };
}
