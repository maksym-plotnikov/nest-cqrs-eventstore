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

    async createUser(createUserDto: CreateAndEditUserDto) {
        const startTs = Date.now();
        const pattern = { cmd: 'CreateUser' };
        return this.usersServiceProxy
            .send<string>(pattern, createUserDto)
            .pipe(
                map((message: string) => ({ message, duration: Date.now() - startTs })),
                timeout(5000),
            )
            .toPromise();
    }
}
