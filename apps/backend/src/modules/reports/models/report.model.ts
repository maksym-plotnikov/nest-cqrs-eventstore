import { AggregateRoot } from '@nestjs/cqrs';
import { ReportCreatedEvent } from '../events/impl/report-created.event';
import { UserReportSubmitEvent } from '../events/impl/user-submitted-report.event';

export class Report extends AggregateRoot {
    constructor(private readonly id: string) {
        super();
    }

    addClientReport(clientId: string) {
        // logic
        this.apply(new UserReportSubmitEvent(this.id, clientId));
    }

    addItem(itemId: string) {
        // logic
        this.apply(new ReportCreatedEvent(this.id, itemId));
    }
}
