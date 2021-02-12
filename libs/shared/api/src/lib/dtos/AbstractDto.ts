import { AbstractEntity } from './abstract.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AbstractDto {
    @IsUUID()
    @ApiPropertyOptional()
    id: string;

    @ApiPropertyOptional({ type: String })
    createdAt: Date;

    @ApiPropertyOptional({ type: String })
    updatedAt: Date;

    constructor(entity: AbstractEntity) {
        this.id = entity.id;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }
}
