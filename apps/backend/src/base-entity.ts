import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity as TypeormBaseEntity,
} from 'typeorm';

export class BaseEntity extends TypeormBaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'createdAt',
    })
    createdAt?: Date;

    @UpdateDateColumn({
        type: 'timestamp without time zone',
        name: 'updatedAt',
    })
    updatedAt?: Date;
}
