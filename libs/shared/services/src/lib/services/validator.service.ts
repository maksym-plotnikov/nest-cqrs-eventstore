import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorService {
    public validMimeType(mimeType: string): boolean {
        const imageMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'video/mp4',
            'video/x-msvideo',
        ];

        return imageMimeTypes.includes(mimeType);
    }

    public isImage(mimeType: string): boolean {
        const imageMimeTypes = ['image/jpeg', 'image/png'];

        return imageMimeTypes.includes(mimeType);
    }
}
