import { BadRequestException } from '@nestjs/common';

export class FileNotMediaException extends BadRequestException {
    constructor(message?: string | Record<string, any> | any, error?: string) {
        if (message) {
            super(message, error);
        } else {
            super('File should be a media file');
        }
    }
}
