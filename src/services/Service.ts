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

  readonly read = async (): Promise<T[]> => this.model.read();

  readonly readOne = async (id: string): Promise<object | null> =>
    this.model.readOne(id);

  readonly update = async (id: string, data: T): Promise<object | null> =>
    this.model.update(id, data);

  readonly delete = async (id: string): Promise<object | null> =>
    this.model.delete(id);
}

export default Service;
