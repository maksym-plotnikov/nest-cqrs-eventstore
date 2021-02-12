import { ICommand } from '@nestjs/cqrs';
import { UserIdRequestParamsDto } from '../../dtos/users.dto';

export class FindUserCommand implements ICommand {
    constructor(public readonly userDto: UserIdRequestParamsDto) {}
}
