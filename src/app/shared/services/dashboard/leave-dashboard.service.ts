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
export class LeaveDashboardService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }


  getSupvPortalDashboardSetDefault(dashboardId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?dashboard_id=${dashboardId}`;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/my-dashboards/set-default` + params, httpOptions)
      .pipe(map(res => {

        // this.leaveRequestsSubject.next(res);
        console.log('supv-portal-dashboard-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('supv-portal-dashboard-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  getSupvPortalMyDashboardList() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const params = `?employee_id=${employeeId}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/my-dashboards`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('supv-portal-dashboard-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('supv-portal-dashboard-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  getSupvPortalDashboardLeave(dashboardId, year, month) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?dashboard_id=${dashboardId}&year=${year}&month=${month}`;

    // dev-api-call
    // const params = `?dashboard_id=${'82FACE9C-B7CF-4216-3F31-08D99C57F7DE'}&year=${year}&month=${month}`;
    // v1/dashboard/division-employee-leave-summaries?dashboard_id=82FACE9C-B7CF-4216-3F31-08D99C57F7DE&year=2020&month=2

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/dashboard/division-employees-leave-summaries` + params, httpOptions)
      .pipe(map(res => {

        // this.leaveRequestsSubject.next(res);
        console.log('supv-portal-dashboard-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('supv-portal-dashboard-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }







  getStaffDetails(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/full-details` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('supv-portal-dashboard-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('supv-portal-dashboard-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }




  getStaffPortalStatistics(employeeId, year, dashboardId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}&year=${year}&dashboard_id=${dashboardId}`;
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




  getStaffPortalCalendarEvents(fromDate, todate, employeeId, dashboardId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?from=${fromDate}&to=${todate}&employee_id=${employeeId}&dashboard_id=${dashboardId}&calendar_type=full_calendar&show_leave_requests=true&show_overtime_requests=true&show_holidays=true&show_amg_attendances=true&show_sap_attendances=true&show_duty_shifts=true`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/calendar-events` + params, httpOptions)
      .pipe(map(res => {
        console.log('staff-portal-leave-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  getStatisticsAbsenseDeatilsForYear(employeeId, year, absenseTypeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}&year=${year}&absence_type_sap_id=${absenseTypeId}`;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/statistics/sap-absence-details-for-year` + params, httpOptions)
      .pipe(map(res => {
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
