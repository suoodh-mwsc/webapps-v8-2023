import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, Subscriber, Subject } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';

import { Adal8HTTPService, Adal8Service, Adal8Interceptor } from 'adal-angular8';
import { ErrorHandlerService } from './../error-handler/error-handler.service';



@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {
  adal8ServiceObj: any;

  constructor(
    private http: Adal8HTTPService,
    private errorHandler: ErrorHandlerService) {
  }

  private prepareOptions(): any {
    // this.adal8ServiceObj = this.authService.getAdal8Service();
    this.adal8ServiceObj;

    // const testCoreApiAuthService = this.coreApiAuthService.postGetCoreApiToken(this.adal8ServiceObj.userInfo.token, 'test_device');
    // console.log('prepareOptions testCoreApiAuthService', testCoreApiAuthService);

    let headers = new HttpHeaders();
    // console.log('ADAL Shit-Hole', this.adal8ServiceObj.userInfo.token);
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.adal8ServiceObj.userInfo.token}`);
    return { headers };
  }


  private prepareOptionsBlog(): any {
    // this.adal8ServiceObj = this.authService.getAdal8Service();
    this.adal8ServiceObj;
    let headers = new HttpHeaders();
    headers = headers
      .set('Authorization', `Bearer ${this.adal8ServiceObj.userInfo.token}`);
    return { headers };
  }

  // ------------------------------------------------------------------------------

  public get(path: string): Observable<any> {
    const options = this.prepareOptions();
    return this.http.get(`${environment.staffAppApiConfig.api_url}${path}`, options)
      .pipe(map(res => res),
        catchError((error: any) => {
          this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      );
  }

  // tslint:disable-next-line:ban-types
  public put(path: string, body: Object = {}): Observable<any> {
    const options = this.prepareOptions();
    return this.http.put(`${environment.staffAppApiConfig.api_url}${path}`, JSON.stringify(body), options)
      .pipe(map(res => res),
        catchError((error: any) => {
          this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      );
  }

  // tslint:disable-next-line:ban-types
  public post(path: string, body: Object = {}): Observable<any> {
    const options = this.prepareOptions();
    return this.http.post(`${environment.staffAppApiConfig.api_url}${path}`, JSON.stringify(body), options)
      .pipe(map(res => res),
        catchError((error: any) => {
          this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      );
  }


  public delete(path: string): Observable<any> {
    const options = this.prepareOptions();
    return this.http.delete(`${environment.staffAppApiConfig.api_url}${path}`, options)
      .pipe(map(res => res),
        catchError((error: any) => {
          this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      );
  }


  // ------------------------------------------------------------------------------

  public getBase64(path: string): Observable<any> {
    const options = this.prepareOptions();
    return this.http.get(`${environment.staffAppApiConfig.api_url}${path}`, options)
      .pipe(map(res => res),
        catchError((error: any) => {
          console.log('Error Occur', error);
          return throwError(error || 'Server error');
        })
      );
  }


  // ------------------------------------------------------------------------------

  formatErrors(error: any | any) {
    this.errorHandler.handleError(error);
  }
}
