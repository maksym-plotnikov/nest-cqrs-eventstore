import { IObjectWithToString } from '@cqrs-nest-app/shared/interfaces';
import { join } from 'path';

export const getEnvPath = (appName, env = 'development') =>
    join(process.cwd(), `/apps/${appName}/.${env}.env`);

export const withModifiedToString = (target: any): IObjectWithToString => {
    if (target.toString() === '[object Object]') {
        target.toString = () => JSON.stringify(target);
    }
    return target;
};

export const checkRequiredKeys = <T extends Record<string, unknown>>(
    requiredKeysArray: string[],
    objectToValidate: T,
) =>
    requiredKeysArray.every(requiredKey =>
        Object.prototype.hasOwnProperty.call(objectToValidate, requiredKey),
    );

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
