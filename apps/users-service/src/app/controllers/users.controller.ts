import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { UserIdRequestParamsDto, UserUpdateDto, UserDeleteDto } from '../dtos/users.dto';
import { UserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
import { EventBus, ofType } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/impl/user-created.event';
import { UserWelcomedEvent } from '../events/impl/user-welcomed.event';
// import { of } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly events$: EventBus,
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
        const user = Object.values(state).find(u => u?.email === userDto.email);
        if (user) return new RpcException('Email is already taken.');
        // We listen till all events will be processed
        let event = null;
        const response = new Promise(resolve => {
            this.events$
                .pipe(ofType(UserCreatedEvent))
                .subscribe(ev => (event = ev.userDto));
            // Resolve only after last event
            this.events$.pipe(ofType(UserWelcomedEvent)).subscribe(ev => resolve(ev));
        });
        await this.usersService.createUser({ id: uuidv4(), ...userDto });
        await response;
        return event;
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
