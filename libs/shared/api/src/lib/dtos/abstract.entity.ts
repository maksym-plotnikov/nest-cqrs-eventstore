import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';
import * as _ from 'lodash';
import { AbstractDto } from './AbstractDto';
import { UtilsService } from './utils.service';

export abstract class AbstractEntity<
    T extends AbstractDto = AbstractDto
> extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp without time zone',
        name: 'updated_at',
    })
    updatedAt: Date;

    abstract dtoClass: new (entity: AbstractEntity) => T;

    toDto() {
        return UtilsService.toDto(this.dtoClass, this);
    }

    toDtos<B extends AbstractDto>(): B[] {
        // tslint:disable-next-line:no-invalid-this
        return <B[]>_(this)
            .map(() => this.toDto())
            .compact()
            .value();
    }
}
