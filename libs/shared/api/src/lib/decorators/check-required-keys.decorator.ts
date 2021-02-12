import { withModifiedToString, checkRequiredKeys } from '@smplct-view/shared/utils';

/**
 * Class method decorator
 * @param requiredKeysArray Array of string with required keys
 */
export function CheckRequiredKeys<T>(requiredKeysArray: string[]) {
    return (target: any, key: any, descriptor: any) => {
        const originalMethod = descriptor.value;

        // wrapping the original method
        descriptor.value = function (...args: any[]) {
            if (checkRequiredKeys<T>(requiredKeysArray, args[0])) {
                return originalMethod.apply(this, args);
            }
            console.info(
                'Object does not contain all required keys. ' +
                    `Required keys: ${requiredKeysArray}. Object: ${withModifiedToString(
                        args[0],
                    )}`,
            );
        };
    };
}
