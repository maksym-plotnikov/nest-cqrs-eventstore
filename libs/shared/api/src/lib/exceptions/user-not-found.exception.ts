import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(message?: string | Record<string, any> | any, error?: string) {
        if (message) {
            super(message, error);
        } else {
            super('User not found');
        }
    }
}
