import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { forwardRef, Inject, Logger as Log } from '@nestjs/common';
import { Logger } from 'winston';
import { EventStoreService } from '@smplct-view/shared/services';
import { UserWelcomedEvent } from '../impl/user-welcomed.event';
import { withModifiedToString } from '@smplct-view/shared/utils';

@EventsHandler(UserWelcomedEvent)
export class UserWelcomedHandler implements IEventHandler<UserWelcomedEvent> {
    constructor(
        @Inject(forwardRef(() => EventStoreService))
        private readonly _es: EventStoreService,
        @Inject('winston') public readonly logger: Logger,
    ) {}
    async handle(event: UserWelcomedEvent) {
        Log.log('UserWelcomedEvent', 'EventsHandler');
        this.logger.info(withModifiedToString(event));
        // TODO Send email
    }
}
