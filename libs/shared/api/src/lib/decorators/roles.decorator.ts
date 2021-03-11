import { SetMetadata } from '@nestjs/common';
import { RoleType } from '@cqrs-nest-app/shared/constants';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
