import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
//
import { environment } from './../../../../environments/environment';
//
import { HttpHeaderService } from './../token/http-header.service';


@Injectable({
  providedIn: 'root'
})
export class YodaCoreApiBaseService {

  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private http: HttpClient, 
    private sanitizer: DomSanitizer) { }

  // public prepareOptions(): any {
  //   let headers = new HttpHeaders();
  //   // let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
  //   let token = JSON.parse(this._cookieService.get('yodaCoreApiToken'));
  //   headers = headers
  //     .set('Content-Type', 'application/json')
  //     .set('Authorization', `Bearer ${token.access_token}`);
  //   return { headers };
  // }
}
