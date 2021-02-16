import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { forwardRef, Inject, Logger as Log } from '@nestjs/common';
import { Logger } from 'winston';
import { EventStoreService } from '@smplct-view/shared/services';
import { UserDeletedEvent } from '../impl/user-deleted.event';
import { withModifiedToString } from '@smplct-view/shared/utils';

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
    constructor(
        @Inject(forwardRef(() => EventStoreService))
        private readonly _es: EventStoreService,
        @Inject('winston') public readonly logger: Logger,
    ) {}
    async handle(event: UserDeletedEvent) {
        Log.log('UserDeletedEvent', 'EventsHandler');
        this.logger.info(withModifiedToString(event));
        // TODO Add constants
        await this._es.appendToStream('users_stream', {
            type: 'UserDeletedEvent',
            data: event.userDto,
        });
    }
}
