import { Model as M, Document } from 'mongoose';
import { ModelInterface } from '../interfaces';
import connectToDatabase from './config';

abstract class MongoModel<T> implements ModelInterface<T> {
  static connection = connectToDatabase();

  constructor(protected model: M<T & Document>) {}

  readonly create = async (data: T): Promise<object> => 
    this.model.create({ ...data });

  readonly read = async (): Promise<T[]> => this.model.find();

  readonly readOne = async (id: string): Promise<object | null> => 
    this.model.findOne({ _id: id });

  readonly update = async (id: string, data: T): Promise<object | null> => 
    this.model.findOneAndUpdate({ _id: id }, { ...data }, { new: true });

  readonly delete = async (id: string): Promise<object | null> =>
    this.model.findByIdAndDelete(id);
}

export default MongoModel;
