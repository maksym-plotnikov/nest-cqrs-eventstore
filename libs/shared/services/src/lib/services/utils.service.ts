// import * as _ from 'lodash';
// import { classToPlain } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Reflector } from '@nestjs/core';

export class UtilsService {
    constructor(private readonly _reflector: Reflector) {}
    /**
     * generate hash from password or string
     * @param {string} password
     * @returns {string}
     */
    static generateHash(password: string | undefined): string {
        if (password == null) {
            return '';
        }
        return bcrypt.hashSync(password, 10);
    }

    /**
     * validate text with hash
     * @param {string} password
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    static validateHash(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash || '');
    }
}
