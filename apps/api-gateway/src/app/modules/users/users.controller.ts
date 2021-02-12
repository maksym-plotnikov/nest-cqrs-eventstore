import { Controller, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiCreatedResponse,
    ApiConflictResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
// import { AuthUserInterceptor } from '../../interceptors';
import { IResponseError } from '@smplct-view/shared/interfaces';
import { UserDto, CreateAndEditUserDto, CreateUserResponseErrorDto } from './dto';

@Controller('users')
// @ApiBearerAuth()
// @UseGuards(AuthGuard)
// @UseInterceptors(AuthUserInterceptor)
@ApiTags('users')
export class UsersController {
    constructor(public service: UsersService) {}

    /**
     * Create new user
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create new user',
    })
    @ApiCreatedResponse({ type: UserDto, description: 'Create new user' })
    @ApiConflictResponse({
        type: CreateUserResponseErrorDto,
        description: 'One of the unique fields has conflict',
    })
    async createUser(
        @Body() createUserDto: CreateAndEditUserDto,
    ): Promise<User | IResponseError> {
        return await this.service.createUser(createUserDto);
    }
}
