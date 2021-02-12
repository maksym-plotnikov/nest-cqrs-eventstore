import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserIdRequestParamsDto } from '../dtos/users.dto';
import { UserDto } from '../dtos/users.dto';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { UpdateUserCommand } from '../commands/impl/update-user.command';
import { DeleteUserCommand } from '../commands/impl/delete-user.command';
import { FindUserCommand } from '../commands/impl/find-user.command';
import { FindUsersCommand } from '../commands/impl/find-users.command';
import { Observable, of } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    async respond(): Promise<Observable<string>> {
        return of('success');
    }

    async createUser(user: UserDto) {
        return await this.commandBus.execute(new CreateUserCommand(user));
    }

    async updateUser(user: UserDto) {
        return await this.commandBus.execute(new UpdateUserCommand(user));
    }

    async deleteUser(user: UserIdRequestParamsDto) {
        return await this.commandBus.execute(new DeleteUserCommand(user));
    }

    async findUser(user: UserIdRequestParamsDto) {
        return await this.queryBus.execute(new FindUserCommand(user));
    }
    async findUsers(users: UserDto[]) {
        return await this.queryBus.execute(new FindUsersCommand(users));
    }
}
