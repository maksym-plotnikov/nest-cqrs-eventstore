import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EventBus, ofType } from '@nestjs/cqrs';
import { filter, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from './users.service';
import { UserCreatedEvent } from '../events/impl/user-created.event';
import { UserUpdatedEvent } from '../events/impl/user-updated.event';
import { UserDeletedEvent } from '../events/impl/user-deleted.event';
import { UserDto, UserIdRequestParamsDto } from '../dtos/users.dto';

export type SubscriptionEvent = UserCreatedEvent | UserUpdatedEvent | UserDeletedEvent;

@Injectable()
export class SubscriptionEventService {
    events: Record<string, any> = {};
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly events$: EventBus,
    ) {
        this.events = {
            create: {
                method: 'createUser',
                eventType: UserCreatedEvent,
            },
            update: {
                method: 'updateUser',
                eventType: UserUpdatedEvent,
            },
            delete: {
                method: 'deleteUser',
                eventType: UserDeletedEvent,
            },
        };
    }

    fireEvent(type, userDto: UserDto | UserIdRequestParamsDto) {
        if (!type) return;
        const revisionId = uuidv4();
        const { method, eventType } = this.events[type];
        this.usersService[method]({ ...userDto, revisionId });
        return new Promise(resolve =>
            this.events$
                .pipe(
                    ofType(eventType),
                    map((ev: SubscriptionEvent) => ev.userDto),
                    filter(dto => dto.revisionId === revisionId),
                )
                .subscribe(resolve),
        );
    }
}
