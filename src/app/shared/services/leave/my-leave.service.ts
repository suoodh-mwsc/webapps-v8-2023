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
export class MyLeaveService {

  service_title = 'my-leave-service';

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }

  // POST ​/v1​/employee​/leave-request
  postStaffPortalLeaveRequest(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request`, body, httpOptions)
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


  // GET /v1​/employee​/leave-request
  getStaffPortalLeaveRequests() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-requests`, httpOptions)
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

  // filter_by_absence_type_sap_id
  getStaffPortalLeaveRequestsByAbsenceTypeWithPaginationFilter(absenceTypeSapId, pageNo, pageSize) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?filter_by_absence_type_sap_id=${absenceTypeSapId}&page=${pageNo}&page_size=${pageSize}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-requests` + params, httpOptions)
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



  getStaffPortalLeaveRequestsWithPaginationFilter(pageNo, pageSize, searchText, leaveType, supervisorApproval, year) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params =
      '?page=' + pageNo + '&page_size=' + pageSize +
      '&search=' + searchText +
      '&filter_by_absence_type_sap_id=' + leaveType;
    '&filter_by_pending_approval=' + supervisorApproval;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-requests` + params, httpOptions)
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



  getStaffPortalLeaveRequestsWithFilter(pageNo, pageSize, absenceTypeSapId, isPendingApproval, searchText) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?filter_by_absence_type_sap_id=${absenceTypeSapId}&filter_by_pending_approval=${isPendingApproval}&page=${pageNo}&page_size=${pageSize}&search=${searchText}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-requests`, httpOptions)
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


  // Get All Leave Requests (Leave By Id)
  // GET /v1​/employee​/leave-request
  getStaffPortalLeaveRequestById() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1​/employee​/leave-request`, httpOptions)
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

  // POST /v1​/employee​/medical-leave-requests
  postStaffPortalNewMedicalLeaveRequest(absenceTypeId, takenFrom, takenTo, employeeId, includeDoctorsConsultation, natureOfSickness, formData) {
    const httpOptions = this._httpHeaderService.prepareOptionsFileUpload();
    const params = '?leave_request_absence_type_sap_id=' + absenceTypeId + '&leave_request_taken_from=' + takenFrom + '&leave_request_taken_to=' + takenTo + '&leave_request_employee_id=' + employeeId + '&leave_request_include_doctors_consultation=' + includeDoctorsConsultation + '&leave_request_nature_of_sickness=' + natureOfSickness;
    // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/medical-leave-requests?leave_request_absence_type_sap_id=9001&leave_request_taken_from=12%2F15%2F2020&leave_request_taken_to=12%2F15%2F2020&leave_request_include_doctors_consultation=false&leave_request_nature_of_sickness=headache

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/medical-leave-requests` + params, formData, httpOptions)
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

  // GET /v1​/employee​/medical-certificate

  // GET /v1​/employee​/leave-requests

  // GET /v1​/employee​/leave-request-history
  getStaffPortalLeaveRequestsHistoryById(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // let apilink: any = environment.staffAppApiConfig.api_url + 'v1/employee/leave-request-history?leave_request_id=' + requestId;
    const params = '?leave_request_id=' + requestId;

    // return this._http.get<any>(apilink, httpOptions)
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request-history` + params, httpOptions)
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


  // POST /v1​/employee​/leave-request​/cancel
  postStaffPortalLeaveRequestCancel(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?leave_request_id=' + requestId;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/cancel` + params, body, httpOptions)
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

  // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/leave-request/extend?leave_request_id=c7edbf2e-5b21-45d0-e24e-08d890f001c1&leave_request_new_taken_to=12%2F12%2F2020
  // POST /v1​/employee​/leave-request​/extend
  postStaffPortalLeaveRequestExtend(leaveId, newDate) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?leave_request_id=' + leaveId + '&leave_request_new_taken_to=' + newDate;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/extend` + params, body, httpOptions)
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


  // POST /v1/employee/leave-request/send-for-approval
  postStaffPortalLeaveRequestSendForApproval(leaveId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?leave_request_id=' + leaveId;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/send-for-approval` + params, body, httpOptions)
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

  // POST /v1​/employee​/leave-request​/recall
  postStaffPortalLeaveRequestRecall(leaveId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?leave_request_id=' + leaveId;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/recall` + params, body, httpOptions)
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

  // POST /v1​/employee​/leave-request​/shorten
  postStaffPortalLeaveRequestShorten(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    // const params = '?leave_request_id=' + leaveId + '&leave_request_new_taken_to=' + newDate;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/shorten`, body, httpOptions)
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






  // GET    /v1/employee/leave-request/work-handovers
  getStaffPortalWorkHandoverWithPaginationFilter(pageNo, pageSize) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?page=${pageNo}&page_size=${pageSize}`;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/work-handovers`, httpOptions)
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






  // POST /v1​/employee​/leave-request​/work-handover
  postStaffPortalLeaveWorkhandoverRequest(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    // const params = '?leave_request_id=' + leaveId + '&leave_request_new_taken_to=' + newDate;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/work-handover`, body, httpOptions)
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


  // GET /v1​/employee​/leave-request​/work-handover​/pending​/approvals
  getStaffPortalWorkHandoverPendingApprovals() {
    const httpOptions = this._httpHeaderService.prepareOptions();
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

  getStaffPortalWorkHandoverPendingApprovalsWithPaginationFilter(pageNo, pageSize) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const params = `?page=${pageNo}&page_size=${pageSize}`;
    const params = '?page=' + pageNo + '&page_size=' + pageSize;

    // return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/work-handover/pending/approvals` + params, httpOptions)
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

  // POST /v1​/employee​/leave-request​/work-handover​/approve
  postStaffPortalWorkHandoverApprove(handoverId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?work_handover_id=' + handoverId;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/work-handover/approve` + params, body, httpOptions)
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



  // /v1/employee/leave-request/work-handovers/by-leave-request-id
  // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/leave-request/work-handover/by-leave-request-id?leave_request_id=c7edbf2e-5b21-45d0-e24e-08d890f001c1
  getStaffPortalLeaveRequestsWorkHandOverById(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?leave_request_id=' + requestId;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/work-handovers/by-leave-request-id` + params, httpOptions)
      .pipe(map(res => {

        // this.leaveRequestsSubject.next(res);
        console.log('getStaffPortalLeaveRequestsWorkHandOverById -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/leave-request/work-handover/cancel?work_handover_id=3fa85f64-5717-4562-b3fc-2c963f66afa6
  getStaffPortalCancelWorkHandOverById(requestId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?work_handover_id=' + requestId;
    // const params = '?work_handover_id=' +'302eb1eb-159a-43f1-2051-08da05b9ab10';

    return this._http.delete<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/work-handover/remove` + params, httpOptions)
      .pipe(map(res => {

        // this.leaveRequestsSubject.next(res);
        console.log('getStaffPortalcancelWorkHandOverById -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }





  // Get All Leave Requests (Leave List)
  // GET /v1/employee/absence-quota/from-sap
  getStaffPortalAbsenceQuotaFromSap(employeeId, Year) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}&year=${Year}`;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/absence-quota/from-sap` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('getStaffPortalAbsenceQuotaFromSap -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  // Get All Leave Requests (Leave List)
  // GET /v1​/employee​/absence-days-and-hours
  getStaffPortalAbsenceDaysAndHours() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/absence-days-and-hours`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('getStaffPortalAbsenceDaysAndHours -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // Get All Leave Requests (Leave List)
  // GET /v1​/employee​/absence-days-and-hours
  getStaffPortalSelfcertificationCount() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/self-certification-count-for-year`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('getStaffPortalSelfcertificationCount -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  // Get All Leave Requests (Leave List)
  // GET /v1/employee/absence-quota/from-sap
  getStaffPortalStatistics(employeeId, year) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}&year=${year}`;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v2/employee/statistics-for-year` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('getStaffPortalAbsenceQuotaFromSap -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  // POST ​/v1​/employee​/leave-request​/approve
  postStaffPortalLeaveRequestApprove(leaveId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify('');
    const params = '?leave_request_id=' + leaveId;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/approve` + params, body, httpOptions)
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



  // POST //v1/employee/leave-request/reject
  postStaffPortalLeaveRequestReject(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-request/reject`, body, httpOptions)
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
