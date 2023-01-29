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
export class OvertimeDashboardService {

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


  getSupvPortalDashboardOvertime(dashboardId, year, month) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?dashboard_id=${dashboardId}&year=${year}&month=${month}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/dashboard/division-employees-overtime-summaries` + params, httpOptions)
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


  getSupvPortalDashboardOvertimeIndividual(dashboardId, year, month, employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?dashboard_id=${dashboardId}&year=${year}&month=${month}&employee_id=${employeeId}`;


    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/dashboard/division-employee-monthly-overtime-summaries` + params, httpOptions)
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
}
