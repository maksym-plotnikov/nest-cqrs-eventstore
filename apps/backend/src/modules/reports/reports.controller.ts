import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ReportSubmitDto } from './interfaces/report-submit-dto.interface';
import { ReportSubmitCommand } from './commands/impl/report-submit.command';
import { Report } from './models/report.model';
import { GetReportsQuery } from './queries/impl';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards';
import { AuthUserInterceptor } from '../../interceptors';

@Controller('reports')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiTags('reports')
export class ReportsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Post(':userId/submit')
    async reportSubmit(@Param('userId') userId: string, @Body() dto: ReportSubmitDto) {
        return this.commandBus.execute(new ReportSubmitCommand(userId, dto.clientId));
    }

    @Get()
    async findAll(): Promise<Report[]> {
        return this.queryBus.execute(new GetReportsQuery());
    }
}
