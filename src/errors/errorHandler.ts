/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HTTP400Error, HTTP500Error } from '.';

class ErrorHandler {
  public isTrustedError(error: Error) {
    if (error instanceof HTTP400Error) return error.isOperational;
    else if (error instanceof HTTP500Error) return error.isOperational;
    return false;
  }
}
export const errorHandler = new ErrorHandler();
