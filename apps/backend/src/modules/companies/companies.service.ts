import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Company } from './company.entity';
import { User } from '../users/user.entity';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class CompaniesService extends TypeOrmCrudService<Company> {
    constructor(
        @InjectRepository(Company) repo,
        private readonly _userRepository: UserRepository,
    ) {
        super(repo);
    }

    async updateCompanyUsers(usersIds: User[], companyId) {
        await Promise.all(
            usersIds.map(id =>
                this._userRepository.update(id, { company: { id: companyId } }),
            ),
        );
    }
}
