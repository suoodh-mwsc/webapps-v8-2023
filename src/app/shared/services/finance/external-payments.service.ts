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
export class ExternalPaymentsService {

  constructor(
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) {
  }


  // POST Utility/ePortalUser/Find
  postePortalUserSearch(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Utility/ePortalUser/Find`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('externalPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  // POST Finance/ExternalPayments
  // var postData = {
  //     'TakenOn': takenOn,
  //     'OrganizationId': takenFrom
  // };

  // GET Finance/ExternalPayments/{AccountNo}/Search
  postPaymentTransactionsSearchByCustomerId(AccountNo) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}Finance/ExternalPayments/` + AccountNo + `/Search`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('externalPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  // GET Finance/ExternalPayments/Organizations
  getOrganizations() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}Finance/ExternalPayments/Organizations`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('externalPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // GET Finance/ExternalPayments/PendingDates
  getPendingDates() {
    const httpOptions = this._httpHeaderService.prepareOptions();
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}Finance/ExternalPayments/PendingDates`, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('externalPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // POST Finance/ExternalPayments/Pending/ByDate
  // var postData = {
  //     'TakenOn': takenOn,
  //     'OrganizationId': takenFrom
  // };
  postPendingPaymentTransactions(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Finance/ExternalPayments/Pending/ByDate`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('externalPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  // POST Finance/ExternalPayments/ForDisconnectedMeters
  // var postData = {
  //     'TakenOn': takenOn,
  //     'OrganizationId': takenFrom
  // };
  postDcPaymentTransactions(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Finance/ExternalPayments/ForDisconnectedMeters`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('externalPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  // POST Finance/ExternalPayments
  // var postData = {
  //     'TakenOn': takenOn,
  //     'OrganizationId': takenFrom
  // };
  postDailyPaymentTransactions(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Finance/ExternalPayments`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('externalPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // POST Finance/ExternalPayments/ManualUpdateToSAP
  //   var postData = {
  //     'PaymentTransactionId': transaction.Id,
  //     'SAPReference': SAPReference
  // };
  postManuallyUpdateToSAP(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Finance/ExternalPayments/ManualUpdateToSAP`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('externalPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
