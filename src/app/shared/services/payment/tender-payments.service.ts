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
export class TenderPaymentsService {

  constructor(
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient) {
  }


  // POST Utility/ePortalUser/Find
  // postTppaPayments(pageNo, pageSize, searchText, pendingUpload, date) {
  postePortalUserSearch(data) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const body = JSON.stringify(data);
    // const params = '?Search_Date=' + searchDate;
    // const params =
    //   '?page=' + pageNo + '&page_size=' + pageSize +
    //   '&search=' + searchText + '&filter_pending_sap_upload=' + pendingUpload + '&filter_by_date=' + date;

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}Utility/ePortalUser/Find`, body, httpOptions)
      .pipe(map(res => {
        console.log('tenderPayments -> res', res);
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('tenderPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // GET Finance/TenderDocumentPayments/Tenders?PageNumber={PageNumber}&PageSize={PageSize}&Search={Search}
  // .set('PageNumber', PageNo)
  // .set('PageSize', PageSize)
  // .set('Search', searchValue);
  getTenderPaymentTransactions(pageNo, pageSize, searchText) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?PageNumber=' + pageNo + '&PageSize=' + pageSize + '&Search=' + searchText;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}Finance/TenderDocumentPayments/Tenders` + params, httpOptions)
      .pipe(map(res => {
        console.log('tenderPayments -> res', res);
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('tenderPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }





  // POST Finance/TenderDocumentPayments/TransactionsFilteredByDate?filter_by_selected_date={filter_by_selected_date}
  // var postData = {
  //     'TakenOn': takenOn,
  //     'OrganizationId': takenFrom
  // };
  getTenderPaymentTransactionsByDate(requestDate) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = '?filter_by_selected_date=' + requestDate;
    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}Finance/TenderDocumentPayments/TransactionsFilteredByDate` + params, httpOptions)
      .pipe(map(res => {
        console.log('tenderPayments -> res', res);
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('tenderPayments -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

}
