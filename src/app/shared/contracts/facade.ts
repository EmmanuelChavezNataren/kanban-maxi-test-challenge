import { Observable } from 'rxjs';

export abstract class IFacade<T, S = boolean> {
  abstract get isLoading$(): Observable<boolean>;
  abstract get succeeded$(): Observable<S>;
  abstract get hasError$(): Observable<boolean>;
  abstract get error$(): Observable<string | null>;
  abstract get data$(): Observable<T>;
}
