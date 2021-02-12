import { IBaseProps } from './base-props';
import { RoleType } from '@smplct-view/shared/constants';

export interface IUser extends IBaseProps {
    firstName: string;
    lastName: string;
    roles: RoleType[];
    email: string;
    // password: string;
}
