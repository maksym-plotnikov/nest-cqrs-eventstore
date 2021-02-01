import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * NO_CONTENT Doesn't allow to send something in response body so we send NOT_FOUND with statusCode NO_CONTENT in body
 */
export class NoContentException extends HttpException {
    constructor(message?: string | Record<string, any> | any, error = 'No Content') {
        message = message || 'No content error';
        super(
            HttpException.createBody(message, error, HttpStatus.NO_CONTENT),
            HttpStatus.NOT_FOUND,
        );
    }
}
