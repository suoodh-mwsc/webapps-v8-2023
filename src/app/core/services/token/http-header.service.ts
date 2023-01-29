import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
//
import { TokenStorageService } from '../token/token-storage.service';



@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {

  constructor(private _tokenStorage: TokenStorageService) { }

  public prepareOptionsForSwitchADAL(): any {
    let headers = new HttpHeaders();
    headers = headers
      .set('Accept', 'application/json');
    return { headers };
  }



  public prepareOptionsLogin(): any {
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');
    return { headers };
  }



  public prepareOptionsRefresh(): any {
    let headers = new HttpHeaders();
    let token = this._tokenStorage.getYodaToken();
    console.log('prepareOptionsRefresh -> ', token);
    headers = headers
      .set('Content-Type', 'application/json')
    // .set('Authorization', `Bearer ${token}`);
    return { headers };
  }



  public prepareOptions(): any {
    let headers = new HttpHeaders();
    let token = this._tokenStorage.getYodaToken();
    // console.log('prepareOptionsRefresh -> ', token);
    headers = headers
      .set('Content-Type', 'application/json');
      // .set('Authorization', `Bearer ${token}`);
    // console.log('headers', headers);
    return { headers };
  }

  public prepareOptionsForBlob(): any {
    let headers = new HttpHeaders();
    let token = this._tokenStorage.getYodaToken();
    headers = headers
      .set('Content-Type', 'application/json')
    return { headers };
  }



  public prepareOptionsFileUpload(): any {
    let token = this._tokenStorage.getYodaToken();

    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`,);;

    console.log('prepareOptionsRefresh -> ', token);
    console.log('prepareOptionsRefresh -> ', headers);
    
    return { headers };
  }



  public prepareOptionsPayslipDownload(): any {
    let headers = new HttpHeaders();
    let token = this._tokenStorage.getYodaToken();
    headers = headers
    .set('Authorization', `Bearer ${token}`);

    let httpOptions: Object = {

      headers: new HttpHeaders(
        { 'Authorization': `Bearer ${token}` }
      ),
      // responseType: 'blob',
      responseType: 'blob' as 'json',
      observe: 'response',
    }

    return { httpOptions };
  }

  public prepareOptionsPayslipDownloadWithObserve(): any {
    //let headers = new HttpHeaders();
    let token = this._tokenStorage.getYodaToken();
    // console.log('prepareOptionsRefresh -> ', token);
    let httpOptions: Object = {
      headers: new HttpHeaders(
        { 'Authorization': `Bearer ${token}` }
      ),
      observe: 'response',
      responseType: 'blob',
    }

    return { httpOptions };
  }



  public prepareOptionsWithParams(searchParams): any {
    let headers = new HttpHeaders();
    let token = this._tokenStorage.getYodaToken();
    console.log('prepareOptionsRefresh -> ', token);
    const params = new HttpParams()
      .set('filter_by_absence_type_sap_id', searchParams.filter_by_absence_type_sap_id);
    // .set('page', searchParams.page)
    // .set('page_size', searchParams.page_size)
    // .set('search', searchParams.search);
    headers = headers
      .set('Content-Type', 'application/json')
    // .set('Authorization', `Bearer ${token}`);
    return { headers, params };
  }



  getYodaCoreApiToken() {
  }

}
