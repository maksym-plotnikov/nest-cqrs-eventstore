import { SerializeOptions } from '@nestjsx/crud';
import { CreateCompanyDto } from './create-company.dto';
import { GetCompanyResponseDto } from './get-company-response.dto';

export const dto = {
    create: CreateCompanyDto,
};

export const serialize: SerializeOptions = {
    get: GetCompanyResponseDto,
};
