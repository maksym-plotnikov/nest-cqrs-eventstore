import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { forwardRef, Inject, Logger } from '@nestjs/common';
import { EventStoreService } from '@cqrs-nest-app/shared/services';
import { UserWelcomedEvent } from '../impl/user-welcomed.event';

@EventsHandler(UserWelcomedEvent)
export class UserWelcomedHandler implements IEventHandler<UserWelcomedEvent> {
    constructor(
        @Inject(forwardRef(() => EventStoreService))
        private readonly _es: EventStoreService,
    ) {}
    async handle(event: UserWelcomedEvent) {
        Logger.log(event, 'UserWelcomedEvent');
        // TODO Add constants
        await this._es.appendToStream('users_stream', {
            type: 'UserWelcomedEvent',
            data: event,
        });
    }
}
