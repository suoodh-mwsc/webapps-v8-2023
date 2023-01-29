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
export class MyOvertimeService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }

  // Get All Overtime Requests (Overtime List)
  // GET /v1​/employee​/overtime-requests
  getStaffPortalOvertimeRequests() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime-requests`, httpOptions)
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

  getStaffPortalOvertimeRequestsWithPaginationFilter(pageNo, pageSize, searchText, supervisorApproval, year) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?page=' + pageNo + '&page_size=' + pageSize;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime-requests` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
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


  // GET /v1​/employee​/overtime-request
  getStaffPortalOvertimeRequestById(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?overtime_request_id=' + requestId;
    // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/overtime-request?overtime_request_id=63dc3cd3-eb70-4780-a489-08d88ba10a3f

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime-request` + params, httpOptions)
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


  // GET /v1​/employee​/overtime-request
  getStaffPortalOvertimeRequestHistoryById(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?overtime_request_id=' + requestId;
    // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/overtime-request?overtime_request_id=63dc3cd3-eb70-4780-a489-08d88ba10a3f

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime-request/history` + params, httpOptions)
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


  // POST /v1​/employee​/overtime-request
  postStaffPortalOvertimeNewRequest(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime-request`, body, httpOptions)
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


  // GET   /v1​/employee​/overtime​/prior-approvals​/by-date
  getStaffPortalOvertimePriorApprovalsByDate(plannedFrom, dateTo) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?overtime_prior_approval_planned_from=' + plannedFrom + '&overtime_prior_approval_planned_to=' + dateTo;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime/prior-approvals/by-date` + params, httpOptions)
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



  // POST /v1​/employee​/overtime-request​/send-for-approval
  postStaffPortalOvertimeRequestSendForApproval(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?overtime_request_id=' + requestId;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime-request/send-for-approval` + params, body, httpOptions)
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

  // POST ​/v1​/employee​/overtime-request​/approval​/recall
  postStaffPortalOvertimeRequestSendForRecall(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?overtime_request_id=' + requestId;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime-request/approval/recall` + params, body, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // this.userAccountsSubject.next(accountData);
        console.log('staff-portal-overtime-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-overtime-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // GET /v1​/employee​/overtime-request​/cancel
  postStaffPortalOvertimeRequestCancel(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?overtime_request_id=' + requestId;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime-request/cancel` + params, httpOptions)
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



  // GET /v1/employee/overtime/prior-approval
  getStaffPortalPriorApprovalRequestById(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const body = JSON.stringify(data);
    const params = '?overtime_prior_approval_id=' + requestId;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime/prior-approval` + params, httpOptions)
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


  // POST ​/v1/employee/overtime-request/approve
  postStaffPortalOvertimeRequestApprove(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?overtime_request_id=' + requestId;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime-request/approve` + params, body, httpOptions)
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






  // POST /v1/employee/overtime-request/reject
  postStaffPortalOvertimeRequestReject(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    // const params = '?leave_request_id=' + requestId;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime-request/reject`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('staff-portal-ot-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-ot-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // POST ​/v1/employee/overtime-request/approve
  postStaffPortalOvertimeRequestDivisionHeadApprove(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v2/employee/overtime-request/approve`, body, httpOptions)
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


  // POST ​/v1/employee/overtime-request/approve
  postStaffPortalOvertimeRequestDivisionHeadReject(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v2/employee/overtime-request/reject`, body, httpOptions)
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



  // POST /v1/employee/overtime/prior-approval/approve
  postStaffPortalOtPriorApprovalRequestApprove(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?overtime_prior_approval_id=' + requestId;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime/prior-approval/approve` + params, body, httpOptions)
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



  // POST /v1/employee/overtime-request/reject
  postStaffPortalOtPriorApprovalRequestReject(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    // const params = '?leave_request_id=' + requestId;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime/prior-approval/reject`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('staff-portal-ot-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-ot-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
