import { ApiProperty } from '@nestjs/swagger';
import { ErrorSource } from '@cqrs-nest-app/shared/constants';
import { BaseResponseError } from '@cqrs-nest-app/shared/api';
import { HttpStatus } from '@nestjs/common';

export class CreateUserResponseErrorDto extends BaseResponseError {
    @ApiProperty()
    error: string;

    @ApiProperty()
    message: string;

    @ApiProperty({
        default: HttpStatus.CONFLICT,
    })
    statusCode: number;

    @ApiProperty({
        enum: ErrorSource,
    })
    errorSource: ErrorSource;
}
