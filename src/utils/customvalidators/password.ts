/* eslint-disable no-useless-escape */
import { registerDecorator, ValidationOptions } from 'class-validator';

export function password(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'password',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          return typeof value === 'string' && specialChars.test(value);
        },
      },
    });
  };
}
