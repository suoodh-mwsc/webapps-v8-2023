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
export class TppaPaymentsService {

  constructor(
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) {
  }


  postTppaPayments(pageNo, pageSize, searchText, pendingUpload, date) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params =
      '?page=' + pageNo + '&page_size=' + pageSize +
      '&search=' + searchText + '&filter_pending_sap_upload=' + pendingUpload + '&filter_by_date=' + date;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}Utility/TPPAPayments` + params, httpOptions)
      .pipe(map(res => {

        // this.leaveRequestsSubject.next(res);
        console.log('tppaService -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('tppaService -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // POST Utility/TPPAPayments/Details
  getTppaPaymentsHistoryDetails(transactionId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?payment_id=' + transactionId;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}Utility/TPPAPayments/Details` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('tppaService -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  // POST Finance/TPPAPayments/ManualUpdateToSAP
  postTppaPaymentsManualUpdateToSAP(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Finance/TPPAPayments/ManualUpdateToSAP`, body, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('tppaService -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  // POST Finance/TPPAPayments/UpdateToSAP?payment_mwsc_reference=
  postTPPAPaymentsUpdateToSAP(mwscReference) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?payment_mwsc_reference=' + mwscReference;
    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Finance/TPPAPayments/UpdateToSAP`, {}, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('tppaService -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

}
