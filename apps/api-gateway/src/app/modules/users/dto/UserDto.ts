import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from '../user.entity';
import { AbstractDto, IsUserRoles } from '@cqrs-nest-app/shared/api';
import { locales, RoleType } from '@cqrs-nest-app/shared/constants';

export class UserDto extends AbstractDto {
    @ApiPropertyOptional()
    firstName: string;

    @ApiPropertyOptional()
    lastName: string;

    @IsUserRoles({
        message: 'User should have available roles',
    })
    @IsNotEmpty({
        message: locales.messages.PROVIDE_ITEM('proper role type'),
    })
    @ApiProperty({ isArray: true, enum: RoleType })
    readonly roles: RoleType[];

    constructor(user: User) {
        super(user);
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.roles = [...user.roles];
    }
}
