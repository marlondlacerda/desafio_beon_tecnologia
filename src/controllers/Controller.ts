import { APIGatewayEvent } from 'aws-lambda';
import { Service } from '../services';
import CacheRedis from '../middlewares/CacheRedis';
import { CreateError, MessageUtil } from '../utils';

const INTERNAL_SERVER_ERROR = 'Internal Server Error';

abstract class Controller<T> {
  constructor(
    readonly service: Service<T>,
    readonly cacheRedis: CacheRedis<T>,
  ) {}

  readonly create = async (event: APIGatewayEvent) => {
    const params:T = JSON.parse(event.body);

    try {
      const result = await this.service.create(params);
      const { id } = result as any;

      this.cacheRedis.set(`getOne:${id}`, result, 60);

      return MessageUtil.success('created', result);
    } catch (err) {
      const error = CreateError('badRequest', err.message);
      return MessageUtil.error(error);
    }
  };

  readonly find = async () => {
    try {
      const cached = await this.cacheRedis.get('getAll');

      if (cached) {
        return MessageUtil.success('cached', cached);
      }

      const result = await this.service.read();
      this.cacheRedis.set('getAll', result, 60);

      return MessageUtil.success('success', result);
    } catch (err) {
      const error = CreateError('error', INTERNAL_SERVER_ERROR);
      return MessageUtil.error(error);
    }
  };

  readonly findOne = async (event: APIGatewayEvent) => {
    const { id } = event.pathParameters;

    const cached = await this.cacheRedis.get(`getOne:${id}`);
    if (cached) {
      return MessageUtil.success('cached', cached);
    }

    try {
      const result = await this.service.readOne(id);
        
      if (!result) {
        const error = CreateError('notFound', 'The data was not found!');

        return MessageUtil.error(error);
      }

      this.cacheRedis.set(`getOne:${id}`, result, 60 * 30);

      return MessageUtil.success('success', result);
    } catch (err) {
      const error = CreateError('error', INTERNAL_SERVER_ERROR);
      return MessageUtil.error(error);
    }
  };

  readonly update = async (event: APIGatewayEvent) => {
    const eventId = event.pathParameters.id;
    const params:T = JSON.parse(event.body);

    try {
      const result = await this.service.update(eventId, params);
      if (!result) {
        const error = CreateError('notFound', 'The data was not found!');

        return MessageUtil.error(error);
      }

      const { id } = result as any;

      this.cacheRedis.set(`getOne:${id}`, result, 60 * 30);

      return MessageUtil.success('noContent');
    } catch (err) {
      const error = CreateError('error', INTERNAL_SERVER_ERROR);
      return MessageUtil.error(error);
    }
  };

  readonly deleteOne = async (event: APIGatewayEvent) => {
    const { id } = event.pathParameters;
    try {
      await this.service.delete(id);

      this.cacheRedis.del(`getOne:${id}`);
      this.cacheRedis.del('getAll');

      return MessageUtil.success('noContent');
    } catch (err) {
      return MessageUtil.error(err);
    }
  };
}

export default Controller;
