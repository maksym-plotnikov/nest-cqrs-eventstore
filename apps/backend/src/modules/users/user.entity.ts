import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import {
    IsOptional,
    IsString,
    MaxLength,
    IsNotEmpty,
    IsEmail,
    IsBoolean,
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

import { BaseEntity } from '../../base-entity';
import { Company } from '../companies/company.entity';
import { PasswordTransformer } from './password.transformer';
import { RoleType } from '../../constants';
const { CREATE, UPDATE } = CrudValidationGroups;

// tslint:disable-next-line:max-classes-per-file
@Entity('users')
export class User extends BaseEntity {
    // @Column({ type: 'enum', array: true, enum: RoleType, default: [] })
    // roles: RoleType[];

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(255, { always: true })
    @IsEmail({ require_tld: false }, { always: true })
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column({ nullable: true, transformer: new PasswordTransformer() })
    password: string;

    @IsOptional({ always: true })
    @IsBoolean({ always: true })
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @Column({ nullable: true })
    firstName: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @Column({ nullable: true })
    lastName: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column({ type: 'enum', enum: RoleType, default: RoleType.User })
    role: RoleType;

    @ManyToOne(() => Company, c => c.users, {
        cascade: ['insert', 'update'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    company: Company;
}
