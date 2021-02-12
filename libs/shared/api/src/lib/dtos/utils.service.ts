import * as _ from 'lodash';
// import { classToPlain } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Reflector } from '@nestjs/core';

export class UtilsService {
    constructor(private readonly _reflector: Reflector) {}
    /**
     * convert entity to dto class instance
     * @param {{new(entity: E): T}} model
     * @param {E[] | E} user
     * @returns {T[] | T}
     */
    public static toDto<T, E>(model: new (entity: E) => T, user: E): T;
    public static toDto<T, E>(model: new (entity: E) => T, user: E[]): T[];
    public static toDto<T, E>(model: new (entity: E) => T, user: E | E[]): T | T[] {
        if (_.isArray(user)) {
            return user.map(u => new model(u));
        }

        return new model(user);
    }

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
