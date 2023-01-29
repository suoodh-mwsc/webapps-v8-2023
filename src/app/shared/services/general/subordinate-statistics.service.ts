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
export class SubordinateStatisticsService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }




  getStatisticsForSubordinates(employeeId, year) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    let params = `?employee_id=${employeeId}&year=${year}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v2/employee/statistics-for-year` + params, httpOptions)
      .pipe(map(res => {
        console.log('supv-portal-base -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('supv-portal-base -> error', error);
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



  getStaffPortalStatisticsOvertimeCalculation(employeeId, fromDate, toDate) {
    const httpOptions = this._httpHeaderService.prepareOptions();

    const params = `?employee_id=${employeeId}&from_date=${fromDate}&to_date=${toDate}`;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/statistics/overtime-calculator` + params, httpOptions)
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


  
  getStaffPortalStatisticsAbsenseDeatilsForYear(employeeId, year, absenseTypeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}&year=${year}&absence_type_sap_id=${absenseTypeId}`;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/statistics/sap-absence-details-for-year` + params, httpOptions)
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
