export interface IResponseError {
    statusCode?: number;
    error?: string | Record<string, any>;
    message?: string;
}
