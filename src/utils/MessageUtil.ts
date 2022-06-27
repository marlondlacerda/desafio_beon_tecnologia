import { ResponseVO } from '../interfaces';
import ResultUtil from './ResultUtil';

enum StatusCode {
  success = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  unprocessableEntity = 422,
  error = 500,
}

class MessageUtil {
  static success(code: string, data?: object): ResponseVO {
    // Caso as requisições forem um sucesso, ele retorna 
    // um objeto com status positivo, 200, 201, 204, etc.
    const result = new ResultUtil(StatusCode[code], data);

    return result.bodyToString();
  }

  static error(err: Error) {
    // Caso as requisições forem um erro, ele retorna
    // um objeto com status negativo, 500, 404, etc.
    if (err.message.includes('duplicate key')) {
      const result = new ResultUtil(
        StatusCode.conflict,
        { error: 'Duplicate Id' },
      );
      return result.bodyToString();
    }

    const status = StatusCode[err.name];

    if (status) {
      const result = new ResultUtil(status, { error: err.message });
      return result.bodyToString();
    } 

    // Caso não seja um erro do tipo especificado,
    // ele retorna um erro genérico com status 500 e um console.log do erro!
    const result = new ResultUtil(StatusCode.error, { error: err.message });
    console.log(err);
    return result.bodyToString();
  }
}

export default MessageUtil;
