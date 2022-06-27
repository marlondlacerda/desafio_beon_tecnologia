import { APIGatewayEvent } from 'aws-lambda';
import { Schema, ZodError } from 'zod';
import { CreateError, MessageUtil } from '../utils';

const DATE_MSG = 'Data inválida ou não informada, exemplos de data válidas:'
  + '"YY/MM/DD" ou "2020-01-01T00:00:00.000Z"';

class Validation {
  constructor(
    private readonly bodySchema: Schema<unknown>,
    private readonly paramsSchema: Schema<unknown>,
  ) {}

  readonly body = async (event: APIGatewayEvent) => {
    try {
      this.bodySchema.parse(JSON.parse(event.body));
    } catch (err: unknown) {
      return Validation.responseError(err);
    }
  };

  readonly params = async (event: APIGatewayEvent) => {
    try {
      this.paramsSchema.parse(event.pathParameters);
    } catch (err: unknown) {
      return Validation.responseError(err);
    }
  };

  static responseError = (error: unknown) => {
    if (error instanceof ZodError) {
      const { message } = error.issues[0];

      const result = message === 'Invalid date' 
        ? CreateError('badRequest', DATE_MSG) 
        : CreateError('badRequest', message);

      return MessageUtil.error(result);
    }
    /* istanbul ignore next */
    const err = CreateError('badRequest', 'invalid body');
    /* istanbul ignore next */
    return MessageUtil.error(err);
  };
}

export default Validation;
