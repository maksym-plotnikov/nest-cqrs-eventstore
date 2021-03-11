import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Inject, Logger as Log } from '@nestjs/common';
import { Logger } from 'winston';
import { EventStoreService } from '@cqrs-nest-app/shared/services';
import { UserUpdatedEvent } from '../impl/user-updated.event';
import { withModifiedToString } from '@cqrs-nest-app/shared/utils';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
    constructor(
        private readonly _es: EventStoreService,
        @Inject('winston') public readonly logger: Logger,
    ) {}
    async handle(event: UserUpdatedEvent) {
        Log.log('UserUpdatedEvent', 'EventsHandler');
        this.logger.info(withModifiedToString(event));
        // TODO Add constants
        await this._es.appendToStream('users_stream', {
            type: 'UserUpdatedEvent',
            data: event.userDto,
        });
    }
}
