import { ZodError } from 'zod';
import { MongoModel } from '../models';

export interface ServiceError {
  error: ZodError;
}

abstract class Service<T> {
  constructor(
    protected model: MongoModel<T>,
  ) { }

  readonly create = async (data: T): Promise<object> => this.model.create(data);
}

export default Service;
