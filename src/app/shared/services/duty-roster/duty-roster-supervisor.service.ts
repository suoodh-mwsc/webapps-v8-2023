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
export class DutyRosterSupervisorService {

  constructor(
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) {
  }


  // POST DutyRoster/ShiftGroups/AssignedToSupervisor
  postShiftGroupsSupervisor(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftGroups/AssignedToSupervisor`, body, httpOptions)
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


  // DutyRoster/ShiftGroups/{ShiftGroupId}/WeeklyShift/{WeekNumber}/{Year}
  getShiftGroupsByShiftGroupId(ShiftGroupId, WeekNumber, Year) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftGroups/` + ShiftGroupId + `/WeeklyShift/` + WeekNumber + `/` + Year, httpOptions)
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



  // GET Common/GetCurrentWeekDetails
  getCurrentWeekDetails() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}Common/GetCurrentWeekDetails`, httpOptions)
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
