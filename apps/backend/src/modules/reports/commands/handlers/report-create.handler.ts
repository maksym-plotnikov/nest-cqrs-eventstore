import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { ReportsRepository } from '../../repository/reports.repository';
import { ReportCreatedCommand } from '../impl/report-created.command';

@CommandHandler(ReportCreatedCommand)
export class ReportCreateHandler implements ICommandHandler<ReportCreatedCommand> {
    constructor(
        private readonly repository: ReportsRepository,
        private readonly publisher: EventPublisher,
    ) {}

    async execute(command: ReportCreatedCommand) {
        console.info(clc.yellowBright('Async [ReportCreated] Command'));
        const { reportId, itemId } = command;
        const hero = this.publisher.mergeObjectContext(
            await this.repository.findOneById(+reportId),
        );
        hero.addItem(itemId);
        hero.commit();
    }
}
