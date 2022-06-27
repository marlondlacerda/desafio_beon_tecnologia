import { APIGatewayEvent } from 'aws-lambda';
import { Schema, ZodError } from 'zod';
import { CreateError, MessageUtil } from '../utils';

class Validation {
  constructor(
    private readonly bodySchema: Schema<unknown>,
    private readonly paramsSchema: Schema<unknown>,
  ) {}

  readonly body = async (event: APIGatewayEvent) => {
    try {
      this.bodySchema.parse(JSON.parse(event.body));
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const { message } = err.issues[0];
        const error = CreateError('badRequest', message);
        return MessageUtil.error(error);
      }
    }
  };

  readonly params = async (event: APIGatewayEvent) => {
    try {
      this.paramsSchema.parse(event.pathParameters);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const { message } = err.issues[0];

        const error = CreateError('badRequest', message);
        return MessageUtil.error(error);
      }
    }
  };
}

export default Validation;
