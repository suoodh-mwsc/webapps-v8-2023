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
export class MyDashboardService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }

  //   GET /v1/general/home-page-banners
  getGenralHomeBanners() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const body = JSON.stringify(data);
    // const params = '?employee_id=' + employeeId

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/general/home-page-banners`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('getGenralHomeBanners -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  //   GET /v1/general/newsfeed
  getGenralHomeNewsfeed() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const body = JSON.stringify(data);
    // const params = '?employee_id=' + employeeId

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/general/newsfeed`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('getGenralHomeNewsfeed -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  //   GET /v1/general/newsfeed
  getGenralTodayPunchInOut() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const body = JSON.stringify(data);
    // const params = '?employee_id=' + employeeId

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/punch-in-and-punch-out`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('getGenralTodayPunchInOut -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  //   GET /v1/general/newsfeed
  getGenralNotifications(pageNo, pageSize, searchText) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const body = JSON.stringify(data);
    const params = `?page=${pageNo}&page_size=${pageSize}&search=${searchText}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/notifications` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('getGenralNotifications -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
