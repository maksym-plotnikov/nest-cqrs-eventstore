import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { UserIdRequestParamsDto, UserUpdateDto, UserDeleteDto } from '../dtos/users.dto';
import { UserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
import { wait } from '@smplct-view/shared/utils';
// import { of } from 'rxjs';

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
        if (user) return new RpcException('Email is already taken.');
        const id = uuidv4();
        await this.usersService.createUser({ id, ...userDto });
        await wait(1500);
        return await this.usersService.findUser({ id });
    }

    /* Update User */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'UpdateUser' })
    async updateUser(userUpdateDto: UserUpdateDto) {
        const user = await this.usersService.findUser({ id: userUpdateDto.aggregateId });
        if (user) {
            return this.usersService.updateUser({
                id: userUpdateDto.aggregateId,
                ...userUpdateDto.dto,
            });
        }
        return new RpcException('User not found');
    }

    /* Delete User */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'DeleteUser' })
    async deleteUser(userDeleteDto: UserDeleteDto) {
        const user = await this.usersService.findUser({ id: userDeleteDto.aggregateId });
        if (user) {
            return this.usersService.deleteUser({ id: userDeleteDto.aggregateId });
        }
        return new RpcException('User not found');
    }

    /* Find User By Id*/
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'FindUserById' })
    async findOneUser(id: UserIdRequestParamsDto) {
        const user = await this.usersService.findUser(id);
        if (!user) return new RpcException('User not found');
        return user;
    }

    /*  List All Users */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'GetAllUsers' })
    async getAllUsers() {
        try {
            const users = await this.usersService.findUsers();
            return Object.values(users);
        } catch (e) {
            return e;
        }
    }
}
