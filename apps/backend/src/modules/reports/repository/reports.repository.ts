import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Report } from '../models/report.model';
import { EventStoreService, EventStoreServiceConstants } from '../../../shared/services';
import { userReport } from './fixtures/user';

@Injectable()
export class ReportsRepository {
    constructor(
        @Inject(forwardRef(() => EventStoreService))
        private readonly _es: EventStoreService,
    ) {}

    async findOneById(id: number): Promise<Report> {
        console.info({ id });
        return userReport;
    }

    async findAll(): Promise<any> {
        return await this._es.readStream('reports_stream', {
            direction: EventStoreServiceConstants.forwards,
            fromRevision: EventStoreServiceConstants.start,
        });
    }
}