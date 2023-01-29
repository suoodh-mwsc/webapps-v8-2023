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


@Injectable({
  providedIn: 'root'
})
export class PendingWorkHandoverService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }

  getStaffPortalWorkHandoverPendingApprovalsWithPaginationFilter(pageNo, pageSize) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const params = `?page=${pageNo}&page_size=${pageSize}`;
    const params = '?page=' + pageNo + '&page_size=' + pageSize;

    // return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/work-handover/pending/approvals` + params, httpOptions)
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/work-handover/pending/approvals`, httpOptions)
      .pipe(map(res => {

        // this.leaveRequestsSubject.next(res);
        console.log('staff-portal-leave-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

}
