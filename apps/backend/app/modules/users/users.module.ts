import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsModule } from '../projects/projects.module';
import { CompaniesModule } from '../companies/companies.module';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';
import { UsersController, CompanyUsersController } from './users.controller';
import { MeController } from './me.controller';

@Module({
    imports: [
        forwardRef(() => ProjectsModule),
        forwardRef(() => CompaniesModule),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController, MeController, CompanyUsersController],
})
export class UsersModule {}
