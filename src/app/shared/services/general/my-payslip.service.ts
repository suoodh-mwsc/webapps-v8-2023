import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
// Env
import { environment } from '../../../../environments/environment';
// Header
import { HttpHeaderService } from './../../../core/services/token/http-header.service';
import { TokenStorageService } from './../../../core/services/token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MyPayslipService {

  constructor(
    private _tokenStorage: TokenStorageService,
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) { }


  // GET /v1/employee/pay-slip/download
  getStaffPortalPayslipDownloadRequest(paySlipSequenceNo, employeeCardSecurityCode, employeeCardPin) {
    let token = this._tokenStorage.getYodaToken();
    let httpOptions: Object = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
      responseType: 'blob'
    }
    console.log('getStaffPortalPayslipDownloadRequest -> httpOptions', httpOptions);

    const params = '?pay_slip_sequence_number=' + paySlipSequenceNo + '&employee_card_security_code=' + employeeCardSecurityCode + '&employee_card_pin=' + employeeCardPin;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/pay-slip/download` + params, httpOptions)
      .pipe(map((res: HttpResponse<Blob>) => {
        // this.leaveRequestsSubject.next(res);
        console.log('getStaffPortalPayslipDownloadRequest -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('getStaffPortalPayslipDownloadRequest -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // GET /v1/employee/pay-slip/download
  getStaffPortalPayslipDownloadRequestNew(paySlipSequenceNo, employeeCardSecurityCode, employeeCardPin) {
    const httpOptions = this._httpHeaderService.prepareOptionsPayslipDownload();
    console.log('getStaffPortalPayslipDownloadRequestNew -> httpOptions', httpOptions);
    // let token = JSON.parse(this._cookieService.get('yodaCoreApiToken'));
    // let httpOptions: Object = {
    //   headers: new HttpHeaders(
    //     { 'Authorization': `Bearer ${token.access_token}` }
    //   ),
    //   observe: 'response',
    //   responseType: 'blob',
    // }
    const params = '?pay_slip_sequence_number=' + paySlipSequenceNo + '&employee_card_security_code=' + employeeCardSecurityCode + '&employee_card_pin=' + employeeCardPin;

    return this._http.get(`${environment.staffAppApiConfig.api_url}v1/employee/pay-slip/download` + params, httpOptions)
      .pipe(map(res => {

        // this.leaveRequestsSubject.next(res);
        console.log('getStaffPortalPayslipDownloadRequests -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  // GET /v1/employee/pay-slip/download
  xgetStaffPortalPayslipDownloadRequests(paySlipSequenceNo, employeeCardSecurityCode, employeeCardPin) {
    // let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    let token = JSON.parse(this._cookieService.get('yodaCoreApiToken'));
    let httpOptions: Object = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.access_token}`,
      }),
      responseType: 'Blob'
    }

    const params = '?pay_slip_sequence_number=' + paySlipSequenceNo + '&employee_card_security_code=' + employeeCardSecurityCode + '&employee_card_pin=' + employeeCardPin;

    return this._http.get(`${environment.staffAppApiConfig.api_url}v1/employee/pay-slip/download` + params, httpOptions)
      .pipe(map(res => {

        // this.leaveRequestsSubject.next(res);
        console.log('getStaffPortalPayslipDownloadRequests -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // GET /v1​/employee​/pay-slip​/list
  getStaffPortalPayslipRequests() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/pay-slip/list`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

}
