import { APIGatewayEvent } from 'aws-lambda';
import { Service } from '../services';
import { CreateError, MessageUtil } from '../utils';

abstract class Controller<T> {
  constructor(
    readonly service: Service<T>,
  ) {}

  readonly create = async (event: APIGatewayEvent) => {
    const params:T = JSON.parse(event.body);

    try {
      const result = await this.service.create(params);

      return MessageUtil.success('created', result);
    } catch (err) {
      const error = CreateError('badRequest', err.message);
      return MessageUtil.error(error);
    }
  };

  readonly find = async () => {
    try {
      const result = await this.service.read();
      return MessageUtil.success('success', result);
    } catch (err) {
      const error = CreateError('error', 'Internal Server Error');
      return MessageUtil.error(error);
    }
  };
}

export default Controller;
