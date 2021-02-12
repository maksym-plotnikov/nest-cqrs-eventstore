import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { forwardRef, Inject, Logger } from '@nestjs/common';
import { EventStoreService } from '@smplct-view/shared/services';
import { UserUpdatedEvent } from '../impl/user-updated.event';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
    constructor(
        @Inject(forwardRef(() => EventStoreService))
        private readonly _es: EventStoreService,
    ) {}
    async handle(event: UserUpdatedEvent) {
        Logger.log(event, 'UserUpdatedEvent');
        // TODO Add constants
        await this._es.appendToStream('users_stream', {
            type: 'UserUpdatedEvent',
            data: event,
        });
    }
}
