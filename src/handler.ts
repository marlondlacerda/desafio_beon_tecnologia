import { APIGatewayEvent, Handler } from 'aws-lambda';

import { todoObjectIdSchema, todoSchema } from './schemas';
import Validation from './middlewares';

import { TodoService } from './services';
import { TodoModel } from './models';
import TodoController from './controllers';

const todoModel = new TodoModel();
const todoService = new TodoService(todoModel);
const todoController = new TodoController(todoService);

const validation = new Validation(
  todoSchema,
  todoObjectIdSchema,
);

export const create: Handler = async (event: APIGatewayEvent) => {
  const result = await validation.body(event);

  if (result) return result;

  return todoController.create(event);
};

export default create;
