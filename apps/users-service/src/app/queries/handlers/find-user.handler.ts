import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { UserRepository } from '../../repository/user.repository';
import { FindUserQuery } from '../impl';

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
    constructor(private readonly repository: UserRepository) {}

    async execute(query: FindUserQuery) {
        console.info(clc.yellowBright('[FindUserQuery] Query'));
        return this.repository.findOne(query);
    }
}
