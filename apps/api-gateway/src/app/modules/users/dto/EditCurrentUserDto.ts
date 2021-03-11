import { IsString, IsNotEmpty, IsUUID, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { locales } from '@cqrs-nest-app/shared/constants';

export class EditCurrentUserDto {
    @IsUUID()
    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @ApiProperty()
    readonly id: string;

    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @ApiProperty()
    readonly firstName: string;

    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @ApiProperty()
    readonly lastName: string;

    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @IsEmail({ allow_display_name: true }, { message: locales.messages.IS_EMAIL })
    @ApiProperty()
    readonly email: string;
}
