import { Schema, model as createModel, Document, models } from 'mongoose';
import MongoModel from './MongoModel';
import { Todo } from '../schemas';

interface TodoDocument extends Todo, Document { }

const todoSchema = new Schema<TodoDocument>({
  name: String,
  execution_date: Date,
  situation: String,
  priority: String,
  conclusion_date: Date,
}, {
  versionKey: false,
});

class TodoModel extends MongoModel<Todo> {
  constructor(public model = models.todos || createModel('todos', todoSchema)) {
    super(model);
  }
}

export default TodoModel;
