import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { UserRepository } from '../../repository/user.repository';
import { FindUsersQuery } from '../impl';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler implements IQueryHandler<FindUsersQuery> {
    constructor(private readonly repository: UserRepository) {}

    async execute() {
        console.info(clc.yellowBright('[FindUsersQuery] Query'));
        return await this.repository.findMany();
    }
}
