import { Controller, Param, Body } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { UserIdRequestParamsDto } from '../dtos/users.dto';
import { UserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
import { of } from 'rxjs';

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
    async createUser(userDto: UserDto) {
        const state = await this.usersService.findUsers();
        const user = Object.values(state).find(u => u?.email === userDto.email);
        if (user) return of(new RpcException('Email is already taken.'));
        return this.usersService.createUser({ ...userDto, id: uuidv4() });
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
    async findUsers() {
        return this.usersService.findUsers();
    }

    /* TODO: Find User */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'FindUsers' })
    async findOneUser(id: UserIdRequestParamsDto) {
        return this.usersService.findUser(id);
    }
}
