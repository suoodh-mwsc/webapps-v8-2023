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
export class MultipleAccountPaymentsService {

  constructor(
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) {
  }


  // GET Utility/OnlinePayments/UtilityMultipleAccountPayments/ByDate
  postMultipleAccountPaymentByDate(searchDate) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?Search_Date=' + searchDate;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}Utility/OnlinePayments/UtilityMultipleAccountPayments/ByDate` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('multipleAccountPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  

  // GET finance/utility-multiple-account_payments/not-uploaded-to-sap
  postMultipleAccountPaymentPendingSAPUploads() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}finance/utility-multiple-account_payments/not-uploaded-to-sap`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('multipleAccountPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // GET utility/mutiple-account-payment?transaction_id=156
  getMultipleAccountPaymentDetailsByPaymentId(paymentId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?transaction_id=' + paymentId;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}utility/mutiple-account-payment` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('multipleAccountPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
