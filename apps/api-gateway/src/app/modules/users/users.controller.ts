import {
    Controller,
    HttpStatus,
    HttpCode,
    Post,
    Body,
    Put,
    Delete,
    Param,
    Get,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiConflictResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
// import { AuthUserInterceptor } from '../../interceptors';
import { IResponseError, IServiceResponse } from '@cqrs-nest-app/shared/interfaces';
import { ParamsWithIdDto, PlainResponseDto } from '@cqrs-nest-app/shared/api';
import { UserDto, CreateAndEditUserDto, CreateUserResponseErrorDto } from './dto';

@Controller('users')
// @ApiBearerAuth()
// @UseGuards(AuthGuard)
// @UseInterceptors(AuthUserInterceptor)
@ApiTags('users')
export class UsersController {
    constructor(public service: UsersService) {}

    /**
     * Find existing user by id
     */
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Find existing user by id',
    })
    @ApiOkResponse({
        type: UserDto,
        description: 'User',
    })
    @ApiConflictResponse({
        type: CreateUserResponseErrorDto,
        description: 'One of the unique fields has conflict',
    })
    async findUserById(
        @Param() params: ParamsWithIdDto,
    ): Promise<IServiceResponse | IResponseError> {
        return await this.service.findUserById(params.id);
    }

    /**
     * Get all Users
     */
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get all Users',
    })
    @ApiOkResponse({
        type: UserDto,
        description: 'Users',
    })
    @ApiConflictResponse({
        type: CreateUserResponseErrorDto,
        description: 'One of the unique fields has conflict',
    })
    async getAllUsers(): Promise<IServiceResponse | IResponseError> {
        return await this.service.getAllUsers();
    }

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
    ): Promise<IServiceResponse | IResponseError> {
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
    ): Promise<IServiceResponse | IResponseError> {
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
    async deleteUser(
        @Param() params: ParamsWithIdDto,
    ): Promise<IServiceResponse | IResponseError> {
        return await this.service.deleteUser(params.id);
    }
}
