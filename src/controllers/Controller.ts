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

  readonly findOne = async (event: APIGatewayEvent) => {
    const { id } = event.pathParameters;

    try {
      const result = await this.service.readOne(id);
        
      if (!result) {
        const error = CreateError('notFound', 'The data was not found!');

        return MessageUtil.error(error);
      }

      return MessageUtil.success('success', result);
    } catch (err) {
      const error = CreateError('error', 'Internal Server Error');
      return MessageUtil.error(error);
    }
  };

  readonly update = async (event: APIGatewayEvent) => {
    const { eventId } = event.pathParameters;
    const params:T = JSON.parse(event.body);

    try {
      const result = await this.service.update(eventId, params);

      if (!result) {
        const error = CreateError('notFound', 'The data was not found!');

        return MessageUtil.error(error);
      }

      return MessageUtil.success('noContent');
    } catch (err) {
      const error = CreateError('error', 'Internal Server Error');
      return MessageUtil.error(error);
    }
  };
}

export default Controller;
