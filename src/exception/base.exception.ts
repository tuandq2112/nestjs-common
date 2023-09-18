export class BaseException extends Error {
  public code: number;
  public data?: any;
  public status: number = 200;
  public message: any;
  constructor(code_: number, message_: string, data_?: Object) {
    super(message_);
    this.code = code_;
    this.data = data_;
    this.message = message_;
  }
}
