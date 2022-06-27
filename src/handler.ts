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

export const find: Handler = () => todoController.find();

export const findOne: Handler = async (event: APIGatewayEvent) => {
  const result = await validation.params(event);

  if (result) return result;

  return todoController.findOne(event);
};

export const update: Handler = async (event: APIGatewayEvent) => {
  const resultId = await validation.params(event);
  const resultBody = await validation.body(event);

  if (resultId) return resultId;
  if (resultBody) return resultBody;

  return todoController.update(event);
};

export const deleteOne: Handler = async (event: APIGatewayEvent) => {
  const result = await validation.params(event);

  if (result) return result;

  return todoController.deleteOne(event);
};
