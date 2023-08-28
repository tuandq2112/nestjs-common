export interface MsgResponse<T> {
  code: number;
  message: any;
  data: T;
}
