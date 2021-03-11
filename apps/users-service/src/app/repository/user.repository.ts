import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import {
    EventStoreService,
    EventStoreServiceConstants,
} from '@cqrs-nest-app/shared/services';
import { ResolvedEvent } from '@eventstore/db-client';
import { FindUserQuery } from '../queries/impl';

@Injectable()
export class UserRepository {
    constructor(private readonly _es: EventStoreService) {}

    createUser(userDto) {
        const user = new User(userDto.id);
        user.setData(userDto);
        user.createUser();
        return user;
    }

    updateUser(userDto) {
        const user = new User(userDto.id);
        user.setData(userDto);
        user.updateUser();
        return user;
    }

    deleteUser(userDto) {
        const user = new User(userDto.id);
        user.setData(userDto);
        user.deleteUser();
        return user;
    }

    welcomeUser(userDto) {
        const user = new User(userDto.id);
        user.welcomeUser();
        return user;
    }

    async findOne(query: FindUserQuery): Promise<ResolvedEvent[]> {
        const events = await this._es.readStream('users_projection_result', {
            direction: EventStoreServiceConstants.backwards,
            fromRevision: EventStoreServiceConstants.end,
            maxCount: 1,
        });
        return events?.[0]?.[query.id] || null;
    }

    async findMany() {
        const events = await this._es.readStream('users_projection_result', {
            direction: EventStoreServiceConstants.backwards,
            fromRevision: EventStoreServiceConstants.end,
            maxCount: 1,
        });
        return events?.[0] || {};
    }
}
