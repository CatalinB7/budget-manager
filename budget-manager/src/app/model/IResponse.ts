export interface IResponse {
    status: 'SUCCESS' | 'FAIL',
    statusCode: number;
    response: any;
}