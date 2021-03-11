import { IsOptional, IsString, IsNotEmpty, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '@cqrs-nest-app/shared/interfaces';
import { UserDto } from './dto';
import { RoleType, locales } from '@cqrs-nest-app/shared/constants';
import { IsUserRoles } from '@cqrs-nest-app/shared/api';

export class User extends UserDto implements IUser {
    @IsOptional()
    @IsNotEmpty()
    @IsString({ always: true })
    @MaxLength(255, { always: true })
    @IsEmail({ require_tld: false }, { always: true })
    email: string;

    @IsOptional()
    @IsUserRoles({
        message: 'User should have available roles',
    })
    @IsNotEmpty({
        message: locales.messages.PROVIDE_ITEM('proper role type'),
    })
    @ApiProperty({ isArray: true, enum: RoleType })
    readonly roles: RoleType[];

    @IsOptional()
    @IsNotEmpty()
    @IsString({ always: true })
    firstName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString({ always: true })
    lastName: string;

    get dtoClass() {
        return UserDto;
    }
}
