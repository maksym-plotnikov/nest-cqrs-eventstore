import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReportCreatedCommand } from '../commands/impl/report-created.command';
import { UserReportSubmitEvent } from '../events/impl/user-submitted-report.event';

const itemId = '0';

@Injectable()
export class ReportsSagas {
    @Saga()
    reportSubmitted = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserReportSubmitEvent),
            map(event => {
                console.info(
                    clc.redBright('Inside [ReportsSagas - UserReportSubmitEvent] Saga'),
                );
                return new ReportCreatedCommand(event.userId, itemId);
            }),
        );
    };
}
