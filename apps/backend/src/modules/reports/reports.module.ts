import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { ReportsController } from './reports.controller';
import { QueryHandlers } from './queries/handlers';
import { ReportsRepository } from './repository/reports.repository';
import { ReportsSagas } from './sagas/reports.sagas';

@Module({
    imports: [CqrsModule],
    controllers: [ReportsController],
    providers: [
        ReportsRepository,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        ReportsSagas,
    ],
})
export class ReportsModule {}
