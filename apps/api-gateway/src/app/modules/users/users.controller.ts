import {
    Controller,
    HttpStatus,
    HttpCode,
    Post,
    Body,
    Put,
    Delete,
    Param,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiConflictResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
// import { AuthUserInterceptor } from '../../interceptors';
import { IResponseError } from '@smplct-view/shared/interfaces';
import { ParamsWithIdDto, PlainResponseDto } from '@smplct-view/shared/api';
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

    /**
     * Update existing user
     */
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Update existing user',
    })
    @ApiOkResponse({
        type: UserDto,
        description: 'User updated',
    })
    @ApiConflictResponse({
        type: CreateUserResponseErrorDto,
        description: 'One of the unique fields has conflict',
    })
    async updateUser(
        @Param() params: ParamsWithIdDto,
        // @AuthUser() user: UserEntity,
        @Body() updateUserDto: CreateAndEditUserDto,
    ): Promise<User | IResponseError> {
        // TODO Add logic
        return await this.service.updateUser(params.id, updateUserDto);
    }

    /**
     * Delete user
     */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Delete user',
    })
    @ApiOkResponse({
        type: PlainResponseDto,
        description: 'User deleted',
    })
    @ApiConflictResponse({
        type: CreateUserResponseErrorDto,
        description: 'One of the unique fields has conflict',
    })
    async deleteUser(@Param() params: ParamsWithIdDto): Promise<User | IResponseError> {
        return await this.service.deleteUser(params.id);
    }
}
