import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { ReportsRepository } from '../../repository/reports.repository';
import { ReportSubmitCommand } from '../impl/report-submit.command';

@CommandHandler(ReportSubmitCommand)
export class ReportSubmitCommandHandler implements ICommandHandler<ReportSubmitCommand> {
    constructor(
        private readonly repository: ReportsRepository,
        private readonly publisher: EventPublisher,
    ) {}

    async execute(command: ReportSubmitCommand) {
        console.info(clc.greenBright('[ReportSubmit] Command'));
        const { userId, clientId } = command;
        const user = this.publisher.mergeObjectContext(
            await this.repository.findOneById(+userId),
        );
        // Call EventCall
        user.addClientReport(clientId);
        user.commit();
    }
}
