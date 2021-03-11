import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { forwardRef, Inject, Logger } from '@nestjs/common';
import { UserCreatedEvent } from '../impl/user-created.event';
import { EventStoreService } from '@cqrs-nest-app/shared/services';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
    constructor(
        @Inject(forwardRef(() => EventStoreService))
        private readonly _es: EventStoreService,
    ) {}
    async handle(event: UserCreatedEvent) {
        Logger.log(event, 'UserCreatedEvent');
        // TODO Add constants
        await this._es.appendToStream('users_stream', {
            type: 'UserCreatedEvent',
            data: event,
        });
    }
}
