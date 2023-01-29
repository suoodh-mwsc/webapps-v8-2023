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
export class DutyRosterHrService {

  constructor(
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) {
  }


  // POST DutyRoster/ShiftGroups/All
  postCreateShiftGroup(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftGroups/New`, body, httpOptions)
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

  // POST DutyRoster/ShiftGroups/All
  postShiftGroupsAll(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftGroups/All`, body, httpOptions)
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


  // GET DutyRoster/ShiftGroups/{ShiftGroupId}/Delete
  getShiftGroupDeleteById(shiftGroupId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + `/Delete`, httpOptions)
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


  // GET DutyRoster/ShiftGroups/{ShiftGroupId}/Restore
  getShiftGroupRestoreById(shiftGroupId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + `/Restore`, httpOptions)
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


  //   GET DutyRoster/ShiftGroups/{ShiftGroupId}/WeeklyShift/ForYear/{Year}
  //   getWeeklyShiftsForYearsByShiftGroupId(ShiftGroupId, Year) {
  //     return this.yoda.get('DutyRoster/ShiftGroups/' + ShiftGroupId + '/WeeklyShift/ForYear/' + Year);
  // }
  getWeeklyshiftByShiftGroupIdAndYear(shiftGroupId, year) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + `/WeeklyShift/ForYear/` + year, httpOptions)
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


  // DutyRoster/ShiftTemplates/All
  getShiftTemplate() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftTemplates/All`, httpOptions)
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


  //   // POST DutyRoster/WeeklyShift/GenerateForYear
  //   postGenerateYearForWeeklyShift(DataBody) {
  //     return this.yoda.post('DutyRoster/WeeklyShift/GenerateForYear', DataBody);
  // }
  // 'Year': this.newWeeklyShift.Year,
  // 'ShiftGroup_Id': this.selectedShiftGroup.Id,
  // 'ShiftTemplate_Id': this.newWeeklyShift.ShiftTemplateId
  postCreateWeeklyShift(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/WeeklyShift/GenerateForYear`, body, httpOptions)
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





  postAddEmployeeToShiftgroup(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftEmployees/New`, body, httpOptions)
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

  postAddSupervisorToShiftgroup(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}DutyRoster/ShiftsSupervisor/New`, body, httpOptions)
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
