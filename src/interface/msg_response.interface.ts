export interface IMsgResponse<T> {
  code: number;
  message: any;
  data: T;
  totalPages?: number;
  pageNumber?: number;
  pageSize?: number;
  numberOfElements?: number;
}
