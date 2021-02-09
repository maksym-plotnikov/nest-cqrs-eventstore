import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { UserReportSubmitEvent } from '../impl/user-submitted-report.event';
import { forwardRef, Inject } from '@nestjs/common';
import { EventStoreService } from '../../../../shared/services';

@EventsHandler(UserReportSubmitEvent)
export class UserReportSubmitEventHandler
    implements IEventHandler<UserReportSubmitEvent> {
    constructor(
        @Inject(forwardRef(() => EventStoreService))
        private readonly _es: EventStoreService,
    ) {}

    async handle(event: UserReportSubmitEvent) {
        // Do logic
        console.info(clc.green('[UserReportSubmit] Event'));
        await this._es.appendToStream('reports_stream', {
            type: 'UserReportSubmit',
            data: {
                userId: event.userId,
                clientId: event.clientId,
            },
        });
    }
}
