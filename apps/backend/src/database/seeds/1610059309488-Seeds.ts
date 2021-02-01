import { plainToClass } from 'class-transformer';
import { MigrationInterface, Repository, QueryRunner } from 'typeorm';
// @ts-ignore todo
import { ClassType } from 'class-transformer/types/ClassTransformer';
import { Company } from '../../modules/companies/company.entity';
import { User } from '../../modules/users/user.entity';
import { RoleType } from '@smplct-view/shared/constants';

export class Seeds1610059309488 implements MigrationInterface {
    private save<T>(repo: Repository<T>, data: Partial<T>[]): Promise<T[]> {
        return repo.save(
            data.map((partial: Partial<T>) =>
                plainToClass<any, any>(repo.target as ClassType<T>, partial, {
                    ignoreDecorators: true,
                }),
            ),
        );
    }

    public async up(queryRunner: QueryRunner): Promise<any> {
        const { connection } = queryRunner;

        const usersRepo = connection.getRepository(User);
        const companiesRepo = connection.getRepository(Company);
        // users
        await this.save(usersRepo, [
            {
                email: 'admin@email.com',
                isActive: true,
                firstName: 'Admin',
                lastName: 'Admin',
                password: 'admin',
                role: RoleType.Admin,
            },
            {
                email: 'user@email.com',
                isActive: true,
                firstName: 'John',
                lastName: 'Doe',
                password: 'user',
                role: RoleType.User,
            },
        ]);
        // companies
        await this.save(companiesRepo, [
            { name: 'Company 1', domain: 'Domain1' },
            { name: 'Company 2', domain: 'Domain2' },
        ]);
        await queryRunner.release();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('SELECT 1');
    }
}
