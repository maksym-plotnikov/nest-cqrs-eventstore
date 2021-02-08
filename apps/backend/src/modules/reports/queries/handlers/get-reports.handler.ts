import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { ReportsRepository } from '../../repository/reports.repository';
import { GetReportsQuery } from '../impl';

@QueryHandler(GetReportsQuery)
export class GetReportsHandler implements IQueryHandler<GetReportsQuery> {
    constructor(private readonly repository: ReportsRepository) {}

    async execute(query: GetReportsQuery) {
        console.info(clc.yellowBright('[GetReports] Query', query));
        return this.repository.findAll();
    }
}
