import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Inject, Logger as Log } from '@nestjs/common';
import { Logger } from 'winston';
import { UserCreatedEvent } from '../impl/user-created.event';
import { EventStoreService } from '@cqrs-nest-app/shared/services';
import { withModifiedToString } from '@cqrs-nest-app/shared/utils';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
    constructor(
        private readonly _es: EventStoreService,
        @Inject('winston') public readonly logger: Logger,
    ) {}
    async handle(event: UserCreatedEvent) {
        Log.log('UserCreatedEvent', 'EventsHandler');
        this.logger.info(withModifiedToString(event));
        // TODO Add constants
        await this._es.appendToStream('users_stream', {
            type: 'UserCreatedEvent',
            data: event.userDto,
        });
    }
}
