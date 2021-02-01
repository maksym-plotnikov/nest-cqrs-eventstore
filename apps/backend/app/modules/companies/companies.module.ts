import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyRepository } from './company.repository';
import { UserRepository } from '../users/user.repository';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyRepository, UserRepository])],
    providers: [CompaniesService],
    exports: [CompaniesService],
    controllers: [CompaniesController],
})
export class CompaniesModule {}
