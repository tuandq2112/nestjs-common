export class BaseException extends Error {
  code: number;
  message: string;
  data?: any;

  constructor(code: number, message: string, data: Object) {
    super(message);
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
