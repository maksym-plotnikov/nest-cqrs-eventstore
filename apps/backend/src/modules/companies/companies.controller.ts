import { Controller, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    Crud,
    CrudController,
    Override,
    CrudRequest,
    ParsedRequest,
    ParsedBody,
} from '@nestjsx/crud';
import { Logger } from 'winston';

import { Company } from './company.entity';
import { CompaniesService } from './companies.service';
import { serialize } from './dto';
import { AuthGuard } from '../../guards';
import { AuthUserInterceptor } from '../../interceptors';

@Crud({
    model: {
        type: Company,
    },
    serialize,
    routes: {
        // deleteOneBase: {
        //     returnDeleted: false,
        // },
    },
    query: {
        alwaysPaginate: true,
        join: {
            users: {
                exclude: ['password'],
                eager: true,
            },
            // 'users.projects': {
            //     eager: true,
            //     alias: 'usersProjects',
            // },
            // 'users.projects.company': {
            //     eager: true,
            //     alias: 'usersProjectsCompany',
            // },
            projects: {
                eager: true,
            },
        },
    },
})
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
    constructor(
        @Inject('winston') private readonly _logger: Logger,
        public service: CompaniesService,
    ) {}

    get base(): CrudController<Company> {
        return this;
    }

    @Override()
    async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Company) {
        const { users } = dto;
        const newCompany = await this.base.createOneBase(req, dto);
        await this.service.updateCompanyUsers(users, newCompany.id);
        return this.service.findOne({ id: newCompany.id });
    }

    @Override()
    async updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Company) {
        const { users } = dto;
        const newCompany = await this.base.updateOneBase(req, dto);
        await this.service.updateCompanyUsers(users, newCompany.id);
        return this.service.findOne({ id: newCompany.id });
    }
}
