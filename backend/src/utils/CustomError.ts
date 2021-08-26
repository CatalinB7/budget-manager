export class CustomError extends Error {
    _statusCode: number;
    constructor(message: string, httpStatus: number) {
        super(message);
        this._statusCode = httpStatus;
    }

    get Message() {
        return this.message;
    }

    get StatusCode() {
        return this._statusCode;
    }
}