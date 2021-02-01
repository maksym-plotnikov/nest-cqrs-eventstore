import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { UserLoginDto } from '../auth/dto';
import { UtilsService } from '../../shared/services';
import { NoContentException } from '../../exceptions';
import { locales } from '@smplct-view/shared/constants';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(User) repo) {
        super(repo);
    }

    async resetPassword(userId: number): Promise<User> {
        const user = await this.findOne({ id: userId });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.password === '') {
            throw new NoContentException(`Password for user ${userId} is already reset`);
        }

        await this.repo.update(userId, {
            password: undefined,
        });
        return this.findOne({ id: userId });
    }

    async changePassword({
        id,
        currentPassword,
        newPassword,
    }: {
        id: number;
        currentPassword: string;
        newPassword: string;
    }) {
        const user = await this.findOne({ id });
        if (!user) {
            throw new NotFoundException(
                locales.messages.USER_ID_NOT_EXIST(id.toString()),
            );
        }

        const isOldPasswordValid = await UtilsService.validateHash(
            currentPassword,
            user.password,
        );

        if (!isOldPasswordValid) {
            throw new NotFoundException(locales.messages.PASSWORD_INCORRECT);
        }

        await this.repo.update(id, {
            password: newPassword,
        });
        return this.findOne({ id });
    }

    async setNewPassword({ email, password }: UserLoginDto): Promise<User> {
        const user = await this.findOne({ email });
        if (!user) {
            throw new NotFoundException(locales.messages.USER_EMAIL_NOT_EXIST(email));
        }

        await this.repo.update(user.id, {
            password,
        });
        return this.findOne({ id: user.id });
    }
}
