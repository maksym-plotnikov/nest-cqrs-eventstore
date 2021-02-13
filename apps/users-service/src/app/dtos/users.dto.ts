import { IsString } from 'class-validator';

export class UserIdRequestParamsDto {
    @IsString()
    readonly id!: string;
}

export class UserDto {
    @IsString()
    readonly id!: string;
    @IsString()
    readonly firstName!: string;
    @IsString()
    readonly lastName!: string;
    @IsString()
    readonly email!: string;
}
