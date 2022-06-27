import lambdaTester from 'lambda-tester';
import { expect } from 'chai';
import { create } from '../handler';
import * as todosMock from './mocks/todo.mocks';
import * as todosInput from './inputs/todoInputs';
import { TodoModel } from '../models/';

import sinon from 'sinon';
const todoModel = new TodoModel();

describe('1) - Create [POST]', () => {
  describe('1) - When the request is valid', () => {
    it('1) - When success', () => {
      const s = sinon.stub(todoModel.model, 'create').resolves(todosMock.create);

      return lambdaTester(create)
        .event({ body: JSON.stringify(todosInput.todoValidCreate) })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);
          
          expect(result.statusCode).to.equal(201);
          expect(body).to.deep.equal(todosMock.create);
          s.restore();
        });
    });
  });

  describe('2) - When the request is invalid or Error', () => {
    it('1) - When mongoose throw Error', () => {
      const s = sinon.stub(todoModel.model, 'create').rejects(todosMock.castError);

      return lambdaTester(create)
      .event({ body: JSON.stringify(todosInput.todoValidCreate) })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(400);
          expect(body).to.deep.equal(todosMock.resultCreateError);
          s.restore();
        });
    });

    it('2) - When a field is missing in the request body', () => {
      const s = sinon.stub(todoModel.model, 'create').resolves(todosMock.create);

      return lambdaTester(create)
        .event({ body: JSON.stringify(todosInput.todoInvalidCreate1) })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(400);
          expect(body).to.deep.equal(todosMock.resultInvalidCreate1);
          s.restore();
        });
    });
  });
});
