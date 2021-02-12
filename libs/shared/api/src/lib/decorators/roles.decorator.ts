import { SetMetadata } from '@nestjs/common';
import { RoleType } from '@smplct-view/shared/constants';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
