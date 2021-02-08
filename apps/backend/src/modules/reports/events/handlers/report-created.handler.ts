import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { ReportCreatedEvent } from '../impl/report-created.event';

@EventsHandler(ReportCreatedEvent)
export class ReportCreatedEventHandler implements IEventHandler<ReportCreatedEvent> {
    handle(event: ReportCreatedEvent) {
        console.info(clc.yellowBright('Async ReportCreatedEvent...', event));
    }
}
