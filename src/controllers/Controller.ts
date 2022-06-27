import { APIGatewayEvent } from 'aws-lambda';
import { Service } from '../services';
import { MessageUtil } from '../utils';

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
      return MessageUtil.error(err);
    }
  };
}

export default Controller;
