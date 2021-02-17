import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { UserIdRequestParamsDto, UserUpdateDto, UserDeleteDto } from '../dtos/users.dto';
import { UserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
import { SubscriptionEventService } from '../services/subscription-event.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly subscriptionService: SubscriptionEventService,
    ) {}

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
        if (!userDto.email) {
            return new RpcException('Wrong data structure');
        }
        const user = Object.values(state).find(u => u?.email === userDto.email);
        if (user) return new RpcException('Email is already taken.');
        // Subscribe to event
        return this.subscriptionService.fireEvent('create', {
            id: uuidv4(),
            ...userDto,
        });
    }

    /* Update User */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'UpdateUser' })
    async updateUser(userUpdateDto: UserUpdateDto) {
        const user = await this.usersService.findUser({ id: userUpdateDto.aggregateId });
        if (!user) return new RpcException('User not found');
        // Subscribe to event
        return this.subscriptionService.fireEvent('update', {
            id: userUpdateDto.aggregateId,
            ...userUpdateDto.dto,
        });
    }

    /* Delete User */
    /*--------------------------------------------*/
    @MessagePattern({ cmd: 'DeleteUser' })
    async deleteUser(userDeleteDto: UserDeleteDto) {
        const user = await this.usersService.findUser({ id: userDeleteDto.aggregateId });
        if (!user) return new RpcException('User not found');
        // Subscribe to event
        return this.subscriptionService.fireEvent('delete', {
            id: userDeleteDto.aggregateId,
        });
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
