import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { forwardRef, Inject, Logger } from '@nestjs/common';
import { EventStoreService } from '@cqrs-nest-app/shared/services';
import { UserDeletedEvent } from '../impl/user-deleted.event';

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
    constructor(
        @Inject(forwardRef(() => EventStoreService))
        private readonly _es: EventStoreService,
    ) {}
    async handle(event: UserDeletedEvent) {
        Logger.log(event, 'UserDeletedEvent');
        // TODO Add constants
        await this._es.appendToStream('users_stream', {
            type: 'UserDeletedEvent',
            data: event,
        });
    }
}
