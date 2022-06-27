import lambdaTester from 'lambda-tester';
import { expect } from 'chai';
import { create, find, findOne, update } from '../handler';
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
    it('1) - returns 500 with message "Internal Server Error"', () => {
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

describe('3) - Read One [GET]', () => {
  describe('1) - When sucess', () => {
    it('1) - returns an object containing the task', () => {
      const s = sinon.stub(todoModel.model, 'findOne').resolves(todosMock.findOne);

      return lambdaTester(findOne)
        .event({ pathParameters: { id: '5dff58da85eb210f0aac43af' } })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(200);
          expect(body).to.deep.equal(todosMock.findOne);
          s.restore();
        });
    });
  });

  describe('2) - When fail or Error', () => {
    it('1) - returns 500 with message "Internal Server Error"', () => {
      const s = sinon.stub(todoModel.model, 'findOne').rejects(todosMock.findError);

      return lambdaTester(findOne)
        .event({ pathParameters: { id: '5dff58da85eb210f0aac43af' } })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(500);
          expect(body).to.deep.equal(todosMock.resultFindError);
          s.restore();
        });
    });

    it('2) - Shoud return status 404 and a error message ', () => {
      const s = sinon.stub(todoModel.model, 'findOne').resolves(null);

      return lambdaTester(findOne)
        .event({ pathParameters: { id: '5dff58da85eb210f0aac43ef' } })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(404);
          expect(body).to.deep.equal(todosMock.resultFindOneError404);
          s.restore();
        });
    })

    it('3) - When the id is invalid returns 400 and message error', () => {
      return lambdaTester(findOne)
        .event({ pathParameters: { id: '5dff58da85eb210f0aac43' } })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(400);
          expect(body).to.deep.equal(todosMock.resultInvalidId);
        });
    });
  });
});

describe('4) - Update [PUT]', () => {
  describe('1) - When sucess', () => {
    it('1) - returns only status 204', () => {
      const s = sinon.stub(todoModel.model, 'findOneAndUpdate').resolves(todosMock.update);

      return lambdaTester(update)
        .event({
          pathParameters: { id: '5dff58da85eb210f0aac43af' },
          body: JSON.stringify(todosInput.todoValidUpdate),
        })
        .expectResult((result: any) => {
          expect(result.statusCode).to.equal(204);
          expect(result.body).to.be.equal(undefined);
          s.restore();
        });
    });
  });

  describe('2) - When fail or Error', () => {
    it('1) - returns 500 with message "Internal Server Error"', () => {
      const s = sinon.stub(todoModel.model, 'findOneAndUpdate').rejects(todosMock.findError);

      return lambdaTester(update)
        .event({
          pathParameters: { id: '5dff58da85eb210f0aac43af' },
          body: JSON.stringify(todosInput.todoValidUpdate),
        })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(500);
          expect(body).to.deep.equal(todosMock.resultFindError);
          s.restore();
      });
    })

    it('2) - When the id is invalid returns 400 and message error', () => {
      return lambdaTester(update)
        .event({
          pathParameters: { id: '5dff58da85eb210f0aac43' },
          body: JSON.stringify(todosInput.todoValidUpdate),
        })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(400);
          expect(body).to.deep.equal(todosMock.resultInvalidId);
        });
    });

    it('3) - When the body is invalid returns 400 and message error', () => {
      return lambdaTester(update)
        .event({
          pathParameters: { id: '5dff58da85eb210f0aac43af' },
          body: JSON.stringify(todosInput.todoInvalidUpdate),
        })
        .expectResult((result: any) => {
          const body = JSON.parse(result.body);

          expect(result.statusCode).to.equal(400);
          expect(body).to.deep.equal(todosMock.resultInvalidBody);
        });
    });
  });
});
