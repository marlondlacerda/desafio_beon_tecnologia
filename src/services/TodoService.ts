import { TodoModel } from '../models';
import { Todo } from '../schemas';
import Service from './Service';

class TodoService extends Service<Todo> {
  constructor(
    readonly model: TodoModel,
  ) {
    super(model);
  }
}

export default TodoService;
