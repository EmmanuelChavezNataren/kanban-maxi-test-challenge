import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Response } from '@shared/models/http-response.model';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export abstract class IRepository {
  protected http = inject(HttpClient);

  readonly #defaultErrorMessage =
    'Se ha producido un error inesperado, inténtelo más tarde.';

  protected get header() {
    return {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
  }

  protected fetchParams<T extends { [key: string]: any }>(
    requestParams: T
  ): HttpParams {
    let params = new HttpParams();
    Object.keys(requestParams).forEach(
      (key): boolean =>
        requestParams[key] === undefined && delete requestParams[key]
    );

    for (const property in requestParams) {
      if (requestParams.hasOwnProperty(property)) {
        params = params.append(property, requestParams[property.toString()]);
      }
    }
    return params;
  }

  protected httpGet<T>(apiUrl: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(apiUrl, { params })
      .pipe(this.handleData(), this.handleError());
  }

  protected httpPost<T>(apiUrl: string, params?: HttpParams): Observable<T> {
    return this.http
      .post<Response<T>>(apiUrl, params?.toString(), this.header)
      .pipe(this.handleData(), this.handleError());
  }

  private handleData(): any {
    return map(({ data }: any) => data);
  }

  private handleError(): any {
    return catchError(({ status, error }) => {
      throw new HttpErrorResponse({
        status,
        error,
      });
    });
  }
}
