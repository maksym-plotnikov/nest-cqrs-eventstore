import { CrudValidationGroups } from '@nestjsx/crud';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
    IsOptional,
    IsString,
    MaxLength,
    IsNotEmpty,
    IsNumber,
    IsEmpty,
    IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

import { BaseEntity } from '../../base-entity';
import { User } from '../users/user.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({ name: 'companies' })
export class Company extends BaseEntity {
    @IsOptional({ groups: [UPDATE] })
    @IsEmpty({ groups: [CREATE] })
    @IsNumber({}, { groups: [UPDATE] })
    @PrimaryGeneratedColumn()
    id?: number;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ groups: [CREATE, UPDATE] })
    @MaxLength(100, { groups: [CREATE, UPDATE] })
    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    domain: string;

    @IsOptional({ always: true })
    @IsString({ always: true })
    @Column({ type: 'text', nullable: true, default: null })
    description: string;

    @IsOptional({ always: true })
    @IsBoolean({ always: true })
    @Column({ type: 'boolean', default: true })
    isActive: boolean;
    /**
     * Relations
     */

    @IsOptional({ groups: [CREATE, UPDATE] })
    @OneToMany(() => User, user => user.company, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true,
    })
    @Type(() => User)
    users: User[];
}
