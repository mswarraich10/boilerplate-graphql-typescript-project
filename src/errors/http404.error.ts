import { BaseError } from './base.error';
import { HttpStatusCode, HttpStatusCodeName } from './codes';

export class HTTP404Error extends BaseError {
  constructor(description: string) {
    super(
      HttpStatusCodeName.NOT_FOUND,
      HttpStatusCode.NOT_FOUND,
      description,
      true
    );
  }
}
