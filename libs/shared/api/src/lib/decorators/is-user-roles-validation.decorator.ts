import { registerDecorator, ValidationOptions } from 'class-validator';
import { RoleType } from '@smplct-view/shared/constants';

export function IsUserRoles(validationOptions?: ValidationOptions) {
    return (obj: Record<string, any>, propertyName: string) => {
        registerDecorator({
            propertyName,
            name: 'IsUserRoles',
            target: obj.constructor,
            options: validationOptions,
            validator: {
                validate() {
                    const receivedData: {
                        roles: RoleType[];
                        // eslint-disable-next-line prefer-rest-params
                    } = arguments[1].object;
                    return (
                        receivedData.roles &&
                        receivedData.roles.every((role: RoleType) =>
                            Object.keys(RoleType).includes(role),
                        )
                    );
                },
            },
        });
    };
}
