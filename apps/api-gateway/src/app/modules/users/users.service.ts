import { Inject, Injectable } from '@nestjs/common';
// import { User } from './user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { map, timeout } from 'rxjs/operators';
import { CreateAndEditUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_SERVICE') private readonly usersServiceProxy: ClientProxy,
    ) {}

    sendProxyRequest(pattern, data) {
        const startTs = Date.now();
        return this.usersServiceProxy
            .send<string>(pattern, data)
            .pipe(
                map((message: string) => ({ message, duration: Date.now() - startTs })),
                timeout(5000),
            )
            .toPromise();
    }

    async createUser(createUserDto: CreateAndEditUserDto) {
        // TODO Add constant
        return this.sendProxyRequest({ cmd: 'CreateUser' }, createUserDto);
    }

    async updateUser(aggregateId: string, updateUserDto: CreateAndEditUserDto) {
        // TODO Add constant
        return this.sendProxyRequest(
            { cmd: 'UpdateUser' },
            { aggregateId, dto: updateUserDto },
        );
    }

    async deleteUser(aggregateId: string) {
        // TODO Add constant
        return this.sendProxyRequest({ cmd: 'DeleteUser' }, { aggregateId });
    }
}
