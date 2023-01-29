import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from './../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
//
import { HttpHeaderService } from './../token/http-header.service';
import { TokenStorageService } from '../token/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CoreGlobalBaseService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _tokenStorage: TokenStorageService,
    private http: HttpClient, 
    private sanitizer: DomSanitizer) { }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    // let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    let token = JSON.parse(this._cookieService.get('yodaCoreApiToken'));
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token.access_token}`);
    return { headers };
  }


  // GET v1/my-profile-details
  getStaffPortalMyDetails() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/my-profile-details`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('staff-portal-global-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-global-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // GET //v1/employee/full-details
  getStaffPortalEmployeeDetails(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?employee_id=' + employeeId;
    return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/full-details` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('staff-portal-global-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-global-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  // GET //v1/employee/picture-from-id
  xxgetStaffPortalEmployeePictureByEmployeeId(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?employee_id=' + employeeId;
    return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/picture-from-id` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('staff-portal-global-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-global-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // GET //v1/employee/picture-from-id
  getStaffPortalEmployeePictureByEmployeeId(employeeId) {

    let httpOptions = new HttpHeaders();
    let token = this._tokenStorage.getYodaToken();
    httpOptions = httpOptions
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    const params = '?employee_id=' + employeeId;

    return this.http.get(`${environment.staffAppApiConfig.api_url}v1/employee/picture-from-id` + params, { headers: httpOptions, responseType: 'blob' })
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('staff-portal-global-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-global-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
