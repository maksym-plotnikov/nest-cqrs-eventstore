import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { locales } from '@smplct-view/shared/constants';

export class UserRegisterDto {
    // @IsString({ message: locales.messages.IS_STRING })
    // @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    // @ApiProperty()
    // readonly firstName: string;
    //
    // @IsString({ message: locales.messages.IS_STRING })
    // @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    // @ApiProperty()
    // readonly lastName: string;

    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @IsEmail({ allow_display_name: true }, { message: locales.messages.IS_EMAIL })
    @ApiProperty()
    readonly email: string;

    @IsString({ message: locales.messages.IS_STRING })
    @MinLength(6, { message: locales.messages.MIN_LENGTH(6) })
    @ApiProperty({ minLength: 6 })
    readonly password: string;
}
