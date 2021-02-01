import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    Crud,
    CrudController,
    CrudRequest,
    ParsedRequest,
    Override,
} from '@nestjsx/crud';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '../../guards';
import { AuthUserInterceptor } from '../../interceptors';

@Crud({
    model: {
        type: User,
    },
    params: {
        id: {
            field: 'id',
            type: 'number',
            primary: true,
        },
    },
    query: {
        exclude: ['password'],
        join: {
            company: {
                exclude: ['description'],
            },
        },
    },
})
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiTags('company-users')
@Controller('/companies/:companyId/users')
export class CompanyUsersController implements CrudController<User> {
    constructor(public service: UsersService) {}

    get base(): CrudController<User> {
        return this;
    }

    @Override('getManyBase')
    getAll(@ParsedRequest() req: CrudRequest) {
        return this.base.getManyBase(req);
    }
}

@Crud({
    model: {
        type: User,
    },
    query: {
        exclude: ['password'],
        join: {
            company: {
                alias: 'userCompanies',
                eager: true,
            },
        },
    },
})
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiTags('users')
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService) {}
}
