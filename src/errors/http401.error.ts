import { BaseError } from './base.error'
import { HttpStatusCode, HttpStatusCodeName } from './codes'

export class HTTP401Error extends BaseError {
  constructor(description: string) {
    super(
      HttpStatusCodeName.NOT_AUTHORIZED,
      HttpStatusCode.UNAUTHORIZED,
      description,
      true
    )
  }
}
