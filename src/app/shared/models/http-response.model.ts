export interface Response<T> {
  status: 'success' | 'error';
  data: T;
  error?: { message: any };
  message?: any;
}
