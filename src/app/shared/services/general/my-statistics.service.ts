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
export class MyStatisticsService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }

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

  getStaffPortalStatisticsOvertimeCalculation(fromDate, toDate) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?from_date=${fromDate}&to_date=${toDate}`;
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

  getStaffPortalStatisticsAbsenseDeatilsForYear(year, absenseTypeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?year=${year}&absence_type_sap_id=${absenseTypeId}`;
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
