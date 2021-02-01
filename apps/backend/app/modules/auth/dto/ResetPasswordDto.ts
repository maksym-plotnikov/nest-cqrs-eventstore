import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { locales } from '../../../constants';

export class ResetPasswordDto {
    @IsUUID()
    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @ApiProperty()
    id: number;
}
