import lambdaTester from 'lambda-tester';
import { expect } from 'chai';
import { create } from '../handler.ts';
import * as todosMock from './mocks/todo.mocks';
import { TodoModel } from '../models/';

import sinon from 'sinon';

describe('Create [POST]', () => {
  it('success', () => {
    const s = sinon
      .mock(TodoModel);

    s.expects('create').resolves(todosMock.create);

    return lambdaTester(create)
      .event({ body: JSON.stringify({
        name: 'Tarefa 1',
        execution_date: '2022/06/01',
        situation: 'Pendente',
        priority: 'Alta',
        conclusion_date: '2020/06/05',
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(201);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });
});
