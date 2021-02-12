import { ApiPropertyOptional } from '@nestjs/swagger';

export class PlainResponseDto {
    @ApiPropertyOptional()
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}
