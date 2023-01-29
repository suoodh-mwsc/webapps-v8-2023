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
export class EmployeeConfigService {

  service_title = 'employee-config-service';

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }


  // GET   /v1​/employee​/subordinates
  getSupvPortalMySubordinates(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}`;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/subordinates` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('supv-portal-employee-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('supv-portal-employee-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  // GET   /v1​/employee​/peers
  getSupvPortalMyPeers(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}`;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/peers` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('supv-portal-employee-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('supv-portal-employee-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  // // GET   /v1​/employee​/subordinates
  // getSupvPortalMySubordinates(employeeId) {
  //   const httpOptions = this._httpHeaderService.prepareOptions();
  //   const params = `?employee_id=${employeeId}`;
  //   return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/subordinates` + params, httpOptions)
  //     .pipe(map(res => {
  //       // this.leaveRequestsSubject.next(res);
  //       console.log('supv-portal-employee-service -> res', res);
  //       return res;
  //     },
  //       catchError((error: any) => {
  //         console.log('supv-portal-employee-service -> error', error);
  //         return throwError(error || 'Server error');
  //       })
  //     ));
  // }

  // // GET   /v1​/employee​/peers
  // getSupvPortalMyPeers(employeeId) {
  //   const httpOptions = this._httpHeaderService.prepareOptions();
  //   const params = `?employee_id=${employeeId}`;
  //   return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/peers` + params, httpOptions)
  //     .pipe(map(res => {
  //       // this.leaveRequestsSubject.next(res);
  //       console.log('supv-portal-employee-service -> res', res);
  //       return res;
  //     },
  //       catchError((error: any) => {
  //         console.log('supv-portal-employee-service -> error', error);
  //         return throwError(error || 'Server error');
  //       })
  //     ));
  // }






  // GET   /v1​/employee​/overtime​/prior-approval​/pending​/approvals
  // page
  // page_size
  // search
  getPendingOvertimePriorApprovalRequestsWithPaginationFilter(pageNo, pageSize, approvalStatus, employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const params = `?page=${pageNo}&page_size=${pageSize}&search=${search}`;
    const params = `?page=${pageNo}&page_size=${pageSize}&filter_by_pending_approval=${approvalStatus}&filter_by_employee_id=${employeeId}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime/prior-approval/pending/approvals` + params, httpOptions)
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



  // GET   /v1​/employee​/overtime-request​/pending​/approvals
  // page
  // page_size
  // search
  getPendingOvertimeApprovalRequestsWithPaginationFilter(pageNo, pageSize, approvalStatus, employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const params = `?page=${pageNo}&page_size=${pageSize}&search=${search}`;
    const params = `?page=${pageNo}&page_size=${pageSize}&filter_by_pending_approval=${approvalStatus}&filter_by_employee_id=${employeeId}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/overtime-request/pending/approvals` + params, httpOptions)
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


  // GET   /v1​/employee​/leave-requests​/pending​/approvals
  getPendingLeaveApprovalRequestsWithPaginationFilter(pageNo, pageSize, absenceType, approvalStatus, employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?page=${pageNo}&page_size=${pageSize}&filter_by_absence_type_sap_id=${absenceType}&filter_by_pending_approval=${approvalStatus}&filter_by_employee_id=${employeeId}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-requests/pending/approvals` + params, httpOptions)
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


  // POST   ​/v1​/employee​/leave-request​/reject
  // {
  //   "leave_request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "leave_request_rejection_reason": "string"
  // }


  // POST    /v1​/employee​/overtime-request​/reject
  // {
  //   "overtime_request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "overtime_request_reject_reason": "string"
  // }



  // /v1/jedi/pending-approval-count
  getPendingApprovalCount() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const params = `?page=${pageNo}&page_size=${pageSize}&search=${search}`;
    // const params = `?page=${pageNo}&page_size=${pageSize}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/jedi/pending-approval-count`, httpOptions)
      .pipe(map(res => {

        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('employee-config -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // /v1/employee/notifications
  // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/notifications?page=1&page_size=10
  getPendingNotificationCount(pageNo, pageSize) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?page=${pageNo}&page_size=${pageSize}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/notifications` + params, httpOptions)
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
}
