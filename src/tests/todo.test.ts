import lambdaTester from 'lambda-tester';
import { expect } from 'chai';
import { create } from '../handler';
import * as todosMock from './mocks/todo.mocks';
import { TodoModel } from '../models/';

import sinon from 'sinon';
const todoModel = new TodoModel();

describe('Create [POST]', () => {
  it('success', () => {
    const s = sinon.stub(todoModel.model, 'create').resolves(todosMock.create);

    return lambdaTester(create)
      .event({ body: JSON.stringify({
        name: 'Tarefa 3',
        execution_date: '2022/06/01',
        situation: 'Pendente',
        priority: 'Alta',
        conclusion_date: '2022/06/05',
      })})
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);
        
        expect(result.statusCode).to.equal(201);
        expect(body).to.deep.equal(todosMock.create);
        s.restore();
      });
  });

  it('error', () => {
    const s = sinon.stub(todoModel.model, 'create').rejects(todosMock.castError);

    return lambdaTester(create)
      .event({ body: JSON.stringify({
        name: 'Tarefa 3',
        execution_date: '2022/06/01',
        situation: 'Pendente',
        priority: 'Alta',
        conclusion_date: '2022/06/05',
      })})
      .expectResult((result: any) => {
        const body = JSON.parse(result.body);

        expect(result.statusCode).to.equal(400);
        expect(body).to.deep.equal(todosMock.resultCreateError);
        s.restore();
      });
  });
});
