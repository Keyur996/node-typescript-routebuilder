export class HttpException extends Error {
  statusCode: number | string;
  success: boolean;
  constructor(message: string, statusCode: number | string) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}
