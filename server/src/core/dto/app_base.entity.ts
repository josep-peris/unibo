import { validate, ValidatorOptions, ValidationError } from 'class-validator';
import { GenericException } from '../api_error/exceptions';

export class ApiBaseEntity<T> {
  constructor(entity?: Partial<T>) {
    Object.assign(this, entity);
  }

  async validateEntity(): Promise<T | undefined> {
    const options: ValidatorOptions = {
      enableDebugMessages: true,
      always: true,
    };
    const errors: ValidationError[] = await validate(this, options);
    if (errors.length > 0) {
      console.error(`validation failed. errors: ${errors.toString()}`, 'Error', 'BaseEntity');
      throw new GenericException(this.constructor.name, errors.toString());
    } else {
      return this as unknown as T;
    }
  }
}