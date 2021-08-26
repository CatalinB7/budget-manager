export class CustomError extends Error {
    #statusCode: number;
    constructor(message: string, httpStatus: number) {
        super(message);
        this.#statusCode = httpStatus;
    }

    get Message() {
        return this.message;
    }

    get StatusCode() {
        return this.#statusCode;
    }
}