import { IEvent } from '@nestjs/cqrs';
import { UserIdRequestParamsDto } from '../../dtos/users.dto';

export class UserDeletedEvent implements IEvent {
    constructor(public readonly userDto: UserIdRequestParamsDto) {}
}
