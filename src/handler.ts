import { APIGatewayEvent, Handler } from 'aws-lambda';

import { TodoService } from './services';
import { TodoModel } from './models';
import TodoController from './controllers';

const todoModel = new TodoModel();
const todoService = new TodoService(todoModel);
const todoController = new TodoController(todoService);

export const create: Handler = async (event: APIGatewayEvent) => 
  todoController.create(event);

export default create;
