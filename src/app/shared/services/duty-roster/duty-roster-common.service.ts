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
export class DutyRosterCommonService {

  constructor(
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) {
  }

  // GET DutyRoster/ShiftGroups/{ShiftGroupId}
  getShiftGroupDetailsById(shiftGroupId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('dutyRoster -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  // GET DutyRoster/ShiftGroups/{ShiftGroupId}
  getShiftGroupYearListByShiftGroupId(shiftGroupId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + '/WeeklyShift/Years', httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('dutyRoster -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
