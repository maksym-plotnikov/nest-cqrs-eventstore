import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { locales } from '@smplct-view/shared/constants';

export class UserLoginDto {
    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @IsEmail({ allow_display_name: true }, { message: locales.messages.IS_EMAIL })
    @ApiProperty()
    readonly email: string;

    @IsString({ message: locales.messages.IS_STRING })
    @ApiProperty()
    readonly password: string;
}
