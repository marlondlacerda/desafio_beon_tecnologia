import { Model as M, Document } from 'mongoose';
import { ModelInterface } from '../interfaces';
import connectToDatabase from './config';

abstract class MongoModel<T> implements ModelInterface<T> {
  static connection = connectToDatabase();

  constructor(protected model: M<T & Document>) {}

  readonly create = async (data: T): Promise<object> => 
    this.model.create({ ...data });
}

export default MongoModel;
