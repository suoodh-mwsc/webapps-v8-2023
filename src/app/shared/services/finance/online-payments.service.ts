import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
// Env
import { environment } from '../../../../environments/environment';
// Header
import { HttpHeaderService } from './../../../core/services/token/http-header.service';


@Injectable({
  providedIn: 'root'
})
export class OnlinePaymentsService {

  constructor(
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) {
  }


  // POST Utility/OnlinePayments/ForAccountNo
  postOnlinePaymentSearchByCustomerId(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Utility/OnlinePayments/ForAccountNo`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('onlineService -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  // POST Utility/OnlinePayments/ForTransactionNo
  postOnlinePaymentSearchByTransactionId(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Utility/OnlinePayments/ForTransactionNo`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('onlineService -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }




  // POST Utility/OnlinePayments/ByDate
  postOnlinePaymentSearchByDate(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Utility/OnlinePayments/ByDate`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('onlineService -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  //GET Finance/OnlinePayments/NotUploadedToSAP
  getOnlinePaymentNotUploadedToSAP() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}Finance/OnlinePayments/NotUploadedToSAP`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('onlineService -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // POST Utility/OnlineApplications/Payments/List
  postOnlinePaymentSearchForApplication(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Utility/OnlineApplications/Payments/List`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('onlineService -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
