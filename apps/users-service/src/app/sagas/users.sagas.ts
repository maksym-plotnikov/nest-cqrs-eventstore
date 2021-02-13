import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/impl/user-created.event';
import { WelcomeUserCommand } from '../commands/impl/welcome-user.command';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class UsersSagas {
    @Saga()
    userCreated = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserCreatedEvent),
            delay(1000),
            map((event: UserCreatedEvent) => {
                Logger.log('Inside [UsersSagas] Saga', 'UsersSagas');
                console.info(event);
                return new WelcomeUserCommand(event.userDto.id);
            }),
        );
    };
}
