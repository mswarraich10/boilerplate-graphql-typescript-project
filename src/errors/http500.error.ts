import { BaseError } from './base.error';
import { HttpStatusCode, HttpStatusCodeName } from './codes';

export class HTTP500Error extends BaseError {
  constructor(description: string) {
    super(
      HttpStatusCodeName.INTERNAL_SERVER,
      HttpStatusCode.INTERNAL_SERVER,
      description,
      true
    );
  }
}
