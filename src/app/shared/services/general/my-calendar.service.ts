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
export class MyCalendarService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }


  // Get All Leave Requests (Leave List)
  // GET /v1​/employee​/calendar-events
  getStaffPortalCalendarEvents(fromDate, todate) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?from=${fromDate}&to=${todate}&calendar_type=full_calendar&show_leave_requests=true&show_overtime_requests=true&show_holidays=true&show_amg_attendances=true&show_sap_attendances=true&show_duty_shifts=true`;

    // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/calendar-events
    // ?from=2020%2F10%2F01&to=2020%2F12%2F30&show_leave_requests=true&show_overtime_requests=true&show_holidays=true&show_amg_attendances=true&show_sap_attendances=true"

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/calendar-events` + params, httpOptions)
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
