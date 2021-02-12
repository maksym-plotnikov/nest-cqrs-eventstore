import { Controller, Param, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserIdRequestParamsDto } from '../dtos/users.dto';
import { UserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /* Ping microservice */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'ping' })
    ping() {
        return this.usersService.respond();
    }

    /* Create User */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'CreateUser' })
    async createUser(@Body() userDto: UserDto): Promise<UserDto> {
        return this.usersService.createUser({ ...userDto });
    }

    /* Update User */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'UpdateUser' })
    async updateUser(@Param() id: UserIdRequestParamsDto, @Body() userDto: UserDto) {
        return this.usersService.updateUser({ ...id, ...userDto });
    }

    /* Delete User */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'DeleteUser' })
    async deleteUser(@Param() id: UserIdRequestParamsDto) {
        return this.usersService.deleteUser(id);
    }

    /* TODO: List Users */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'FindUsers' })
    async findUsers(users: UserDto[]) {
        return this.usersService.findUsers(users);
    }

    /* TODO: Find User */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'FindUsers' })
    async findOneUser(id: UserIdRequestParamsDto) {
        return this.usersService.findUser(id);
    }
}
