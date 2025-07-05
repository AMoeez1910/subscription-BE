export class CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: { [key: string]: { message: string } };

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
