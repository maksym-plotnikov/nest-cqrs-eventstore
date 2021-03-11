import { IBaseProps } from './base-props';
import { RoleType } from '@cqrs-nest-app/shared/constants';

export interface IUser extends IBaseProps {
    firstName: string;
    lastName: string;
    roles: RoleType[];
    email: string;
    // password: string;
}
