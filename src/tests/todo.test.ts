import lambdaTester from 'lambda-tester';
import { expect } from 'chai';
import { create, find } from '../handler';
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
      return lambdaTester(create)
        .event({ body: JSON.stringify(todosInput.todoInvalidCreate1) })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(400);
          expect(body).to.deep.equal(todosMock.resultInvalidCreate1);
        });
    });

    it('3) - When a field is invalid date', () => {
      return lambdaTester(create)
        .event({ body: JSON.stringify(todosInput.todoInvalidCreate2) })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(400);
          expect(body).to.deep.equal(todosMock.resultInvalidCreate2);
        });
    });

    it('4) - When a enum is invalid for situation', () => {
      return lambdaTester(create)
        .event({ body: JSON.stringify(todosInput.todoInvalidCreate3) })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(400);
          expect(body).to.deep.equal(todosMock.resultInvalidCreate3);
        });
    });
  });
});

describe('2) - Read [GET]', () => {
  describe('1) - When sucess', () => {
    it('1) - returns an empty array or with objects containing the task list', () => {
      const s = sinon.stub(todoModel.model, 'find').resolves(todosMock.find);

      return lambdaTester(find)
        .event({})
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(200);
          expect(body).to.deep.equal(todosMock.find);
          s.restore();
        });
    });
  });

  describe('2) - When error', () => {
    it('1) - returns an empty array or with objects containing the task list', () => {
      const s = sinon.stub(todoModel.model, 'find').rejects(todosMock.findError);

      return lambdaTester(find)
        .event({})
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(500);
          expect(body).to.deep.equal(todosMock.resultFindError);
          s.restore();
        });
    });
  });
});
