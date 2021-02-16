import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Observable, of } from 'rxjs';
import { UserIdRequestParamsDto, UserDto } from '../dtos/users.dto';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { UpdateUserCommand } from '../commands/impl/update-user.command';
import { DeleteUserCommand } from '../commands/impl/delete-user.command';
import { FindUserQuery, FindUsersQuery } from '../queries/impl';

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
        return this.commandBus.execute(new UpdateUserCommand(user));
    }

    async deleteUser(user: UserIdRequestParamsDto) {
        return this.commandBus.execute(new DeleteUserCommand(user));
    }

    async findUser(user: UserIdRequestParamsDto): Promise<UserDto> {
        return this.queryBus.execute(new FindUserQuery(user.id));
    }

    async findUsers(): Promise<Record<string, UserDto>> {
        return this.queryBus.execute(new FindUsersQuery());
    }
}
