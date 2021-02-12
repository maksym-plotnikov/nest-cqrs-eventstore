import { ApiProperty } from '@nestjs/swagger';
import { ErrorSource } from '@smplct-view/shared/constants';
import { BaseResponseError } from '@smplct-view/shared/api';
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
