import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from './../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
// Header
import { HttpHeaderService } from './../../../../core/services/token/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class MwscCommonEmployeeBaseService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  // GET  /v1​/employee​/search
  getMwscCommonEmployeeSearch(searchtext) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?search_value=' + searchtext;
    // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/overtime-request?overtime_request_id=63dc3cd3-eb70-4780-a489-08d88ba10a3f

    return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/search` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // this.userAccountsSubject.next(accountData);
        console.log('staff-portal-overtime-service', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-overtime-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


}
