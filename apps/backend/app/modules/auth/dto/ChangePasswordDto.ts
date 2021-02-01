import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { locales } from '../../../constants';

export class ChangePasswordDto {
    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @ApiProperty()
    currentPassword: string;

    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @ApiProperty()
    newPassword: string;
}
