import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IResponseError } from '@cqrs-nest-app/shared/interfaces';

export class BaseResponseError implements IResponseError {
    @ApiProperty()
    error = '';

    @ApiProperty()
    message = '';

    @ApiProperty({
        default: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    statusCode = 500;
}
