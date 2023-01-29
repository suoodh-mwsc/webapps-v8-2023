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
export class SubordinatePriorApprovalService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }


  // Get All Overtime PriorApproval Requests (OvertimePriorApproval List)
  // GET /v1​/employee​/overtime​/prior-approvals
  getOvertimePriorApprovalRequestsWithPaginationFilter(pageNo, pageSize, employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const params = `?page=${pageNo}&page_size=${pageSize}&employee_id=${employeeId}`;
    const params = `?page=${pageNo}&page_size=${pageSize}&employee_id=${employeeId}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime/prior-approvals` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // Create Prior Approval request
  // POST /v1​/employee​/overtime​/prior-approval
  postStaffPortalNewPriorApprovalRequest(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime/prior-approval`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('postStaffPortalNewPriorApprovalRequest -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // ​POST  /v1​/employee​/overtime​/prior-approval​/send-for-approval
  // overtime_prior_approval_id
  postOtPriorApprovalRequestSendForApproval(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?overtime_prior_approval_id=' + requestId;
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime/prior-approval/send-for-approval` + params, body, httpOptions)
      .pipe(map(res => {

        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // GET /v1​/employee​/overtime​/prior-approval/history
  getStaffPortalPriorApprovalHistoryRequestById(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const body = JSON.stringify(data);
    const params = '?overtime_prior_approval_id=' + requestId;
    // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/overtime/prior-approval/history
    // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/overtime/prior-approval?overtime_prior_approval_id=730c5918-6ece-4810-5194-08d890f25912
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime/prior-approval/history` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('getStaffPortalPriorApprovalRequestById history -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('getStaffPortalPriorApprovalRequestById -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

}
