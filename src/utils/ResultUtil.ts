class ResultUtil {
  private statusCode: number;

  private message: object | [];

  constructor(statusCode: number, message: object | []) {
    this.statusCode = statusCode;
    this.message = message;
  }

  bodyToString() {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify(this.message),
    };
  }
}

export default ResultUtil;
