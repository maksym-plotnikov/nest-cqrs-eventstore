import { ConflictException } from '@nestjs/common';
import { ErrorSource } from '@cqrs-nest-app/shared/constants';

export class UserEmailAlreadyExistException extends ConflictException {
    constructor(message?: string | Record<string, any> | any, error?: string) {
        if (message) {
            super(message, error);
        } else {
            super('User email is already used by another user');
        }
    }

    getResponse() {
        const originalResponses = super.getResponse();
        if (typeof originalResponses === 'object') {
            return {
                ...originalResponses,
                errorSource: ErrorSource.EMAIL,
            };
        }
        return originalResponses;
    }
}
