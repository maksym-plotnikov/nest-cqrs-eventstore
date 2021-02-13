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

    constructor(dto: AbstractDto) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.updatedAt = dto.updatedAt;
    }
}
