import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseError } from '../../../utils/base-response-error';

export class LoginResponseErrorDto extends BaseResponseError {
    @ApiProperty({
        default: HttpStatus.NOT_FOUND,
    })
    statusCode = 404;
}
