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
export class SubordinateCalendarService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }

    
  getStaffPortalCalendarEvents(fromDate, todate, employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const params = `?from=${fromDate}&to=${todate}&employee_id=${employeeId}&show_leave_requests=true&show_overtime_requests=true&show_holidays=true&show_amg_attendances=true&show_sap_attendances=true`;
    const params = `?from=${fromDate}&to=${todate}&employee_id=${employeeId}&calendar_type=full_calendar&show_leave_requests=true&show_overtime_requests=true&show_holidays=true&show_amg_attendances=true&show_sap_attendances=true&show_duty_shifts=true`;

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
}
