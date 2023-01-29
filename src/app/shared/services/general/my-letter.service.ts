import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
// Env
import { environment } from '../../../../environments/environment';
// Header
import { HttpHeaderService } from './../../../core/services/token/http-header.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class MyLetterService {

  constructor(
    private _tokenStorageService: TokenStorageService,
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }


  // GET /v1/employee/pay-slip/download
  getStaffPortalLetterDownloadRequests(documentId) {
    let token = this._tokenStorageService.getYodaToken();
    let httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
      responseType: 'text'
    }

    const params = '?documnet_id=' + documentId;

    return this._http.get(`${environment.staffAppApiConfig.api_url}v1/employee/document/download` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('getStaffPortalLetterDownloadRequests -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  // Get All Leave Requests (Leave List)
  // GET /v1​/employee​/pay-slip​/list
  getStaffPortalLetterRequests() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/documents`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('getStaffPortalLetterRequests -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // Get All Leave Requests (Leave List)
  // GET /v1​/employee​/pay-slip​/list
  getStaffPortalLetterRequestsWithPaginationFilter(pageNo, pageSize) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?page=${pageNo}&page_size=${pageSize}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/documents` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('getStaffPortalLetterRequests -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

}
