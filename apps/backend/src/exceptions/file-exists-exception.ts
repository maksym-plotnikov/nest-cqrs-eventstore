import { BadRequestException } from '@nestjs/common';

export class FileExistsException extends BadRequestException {
    constructor(message?: string | Record<string, any> | any, error?: string) {
        if (message) {
            super(message, error);
        } else {
            super('File already exists. Please rename or choose another file.');
        }
    }
}
