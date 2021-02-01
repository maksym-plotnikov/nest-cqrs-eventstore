import { TokenPayloadDto } from './TokenPayloadDto';
import { User } from '../../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPayloadDto {
    @ApiProperty({ type: User })
    user: User;
    @ApiProperty({ type: TokenPayloadDto })
    token: TokenPayloadDto;

    constructor(user: User, token: TokenPayloadDto) {
        this.user = user;
        this.token = token;
    }
}
