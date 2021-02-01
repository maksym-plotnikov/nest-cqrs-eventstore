import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Company } from './company.entity';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {}
