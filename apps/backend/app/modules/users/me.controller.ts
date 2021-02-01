import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth } from '@nestjsx/crud';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '../../guards';
import { AuthUserInterceptor } from '../../interceptors';

@Crud({
    model: {
        type: User,
    },
    routes: {
        only: ['getOneBase', 'updateOneBase'],
    },
    params: {
        id: {
            primary: true,
            disabled: true,
        },
    },
    query: {
        join: {
            company: {
                eager: true,
            },
        },
    },
})
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
@CrudAuth({
    filter: (user: User) => ({
        id: user.id,
    }),
})
@ApiTags('me')
@Controller('me')
export class MeController {
    constructor(public service: UsersService) {}
}
