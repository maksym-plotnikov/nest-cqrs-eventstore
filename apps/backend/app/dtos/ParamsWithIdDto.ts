import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { locales } from '../constants';

export class ParamsWithIdDto {
    @IsUUID()
    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @ApiProperty()
    readonly id: number;
}
