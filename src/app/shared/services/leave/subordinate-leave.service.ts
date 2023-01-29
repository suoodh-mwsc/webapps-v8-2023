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
export class SubordinateLeaveService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    // let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    let token = JSON.parse(this._cookieService.get('yodaCoreApiToken'));
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token.access_token}`);
    return { headers };
  }

  private prepareOptionsFormData(): any {
    let headers = new HttpHeaders();
    // let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    let token = JSON.parse(this._cookieService.get('yodaCoreApiToken'));
    headers = headers
      .set('Authorization', `Bearer ${token.access_token}`);
    return { headers };
  }

  // Create Leave
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



  // POST /v1​/employee​/medical-leave-requests
  postStaffPortalNewMedicalLeaveRequest(absenceTypeId, takenFrom, takenTo, includeDoctorsConsultation, natureOfSickness, employeeId, formData) {
    const httpOptions = this._httpHeaderService.prepareOptionsFileUpload();

    const params = '?leave_request_absence_type_sap_id=' + absenceTypeId + '&leave_request_taken_from=' + takenFrom + '&leave_request_taken_to=' + takenTo + '&leave_request_include_doctors_consultation=' + includeDoctorsConsultation + '&leave_request_nature_of_sickness=' + natureOfSickness + '&leave_request_employee_id=' + employeeId;

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




  // Get Leave
  getStaffPortalLeaveRequestsWithPaginationFilter(pageNo, pageSize, employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?page=${pageNo}&page_size=${pageSize}&employee_id=${employeeId}`;
    // const params = `?page=${pageNo}&page_size=${pageSize}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/leave-requests` + params, httpOptions)
      .pipe(map(res => {

        // this.leaveRequestsSubject.next(res);
        console.log('supv-portal-leave-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('supv-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  getStaffPortalLeaveRequestsByAbsenceTypeWithPaginationFilter(absenceTypeSapId, pageNo, pageSize, employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?filter_by_absence_type_sap_id=${absenceTypeSapId}&page=${pageNo}&page_size=${pageSize}&employee_id=${employeeId}`;
    // const params = `?filter_by_absence_type_sap_id=${absenceTypeSapId}&page=${pageNo}&page_size=${pageSize}`;

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




  // POST /v1​/employee​/leave-request​/work-handover
  // {
  //   "leave_request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "responsibilities": "string",
  //   "work_handover_employee_id": "string"
  // }
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

  // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/leave-request/work-handover/by-leave-request-id?leave_request_id=c7edbf2e-5b21-45d0-e24e-08d890f001c1
  //     /v1/employee/leave-request/work-handover/by-leave-request-id
  // GET /v1/employee/leave-request/work-handover/by-leave-request-id
  getStaffPortalLeaveRequestsWorkHandOverById(requestId) {

    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?leave_request_id=' + requestId;
    console.log('work-handovers/by-leave-request-id ->' + `${environment.staffAppApiConfig.api_url}v1/employee/leave-request/work-handovers/by-leave-request-id` + params)

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
  // {
  //   "leave_request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "leave_request_rejection_reason": "string"
  // }
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
