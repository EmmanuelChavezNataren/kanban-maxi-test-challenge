export interface IState<T, C = boolean> {
  hasError: boolean;
  errorMessage: string | null;
  data: T;
  isLoading?: boolean;
  succeeded?: C;
}
