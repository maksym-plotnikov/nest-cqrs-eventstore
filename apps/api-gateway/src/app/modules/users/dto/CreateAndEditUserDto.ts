import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { locales, RoleType } from '@cqrs-nest-app/shared/constants';
import { IsUserRoles } from '@cqrs-nest-app/shared/api';

export class CreateAndEditUserDto {
    @IsOptional()
    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @ApiPropertyOptional()
    readonly id: string;

    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @ApiProperty()
    readonly firstName: string;

    @IsOptional()
    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @ApiProperty()
    readonly lastName: string;

    @IsOptional()
    @IsString({ message: locales.messages.IS_STRING })
    @IsNotEmpty({ message: locales.messages.IS_NOT_EMPTY })
    @IsEmail({ allow_display_name: true }, { message: locales.messages.IS_EMAIL })
    @ApiProperty()
    readonly email: string;

    @IsOptional()
    @IsNotEmpty({
        message: locales.messages.PROVIDE_ITEM('proper role type'),
    })
    @IsUserRoles({
        message: 'User should have proper roles',
    })
    @ApiProperty({ isArray: true, enum: RoleType })
    readonly roles: RoleType[];
}
