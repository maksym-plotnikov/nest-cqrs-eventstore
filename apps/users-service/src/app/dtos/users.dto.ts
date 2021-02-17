import { IsString, IsNotEmpty } from 'class-validator';

export class UserIdRequestParamsDto {
    @IsString()
    readonly id!: string;
    @IsString()
    readonly revisionId?: string;
}
export class UserDto {
    @IsString()
    @IsNotEmpty()
    readonly id: string;
    @IsString()
    readonly firstName: string;
    @IsString()
    readonly lastName: string;
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly revisionId: string;
}

export class UserDeleteDto {
    @IsString()
    readonly aggregateId!: string;
}

export class UserUpdateDto extends UserDeleteDto {
    dto!: UserDto;
    static dto: UserDto;
}
