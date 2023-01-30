import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from './../token/token-storage.service';
import { StaffPortalAuthService } from './../auth/staff-portal-auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, mergeMap, switchMap, take } from 'rxjs/operators';
// import { YodaCoreAuthService } from "./../auth/du-auth/yoda-core-auth.service";
import * as moment from 'moment';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _staffPortalAuth: StaffPortalAuthService,
    private _tokenService: TokenStorageService) { }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    let token = this._tokenService.getAdalToken();

    if (token != null) {
      console.log('auth.interceptor token', token);            

      if (!req.url.includes('v1/auth')) {
        let allTokenDetails = this._tokenService.getAdalAllTokenDetails();
        var currentTime = moment();
        var tokenExpiresOn = moment(allTokenDetails.ADAL_TOKEN_EXPIRY);
        var refreshTokenExpiresOn = moment(allTokenDetails.ADAL_REFRESHTOKEN_EXPIRY);
        console.log('auth.interceptor req.url', req.url);
        console.log('auth.interceptor currentTime', currentTime.toString());
        console.log('auth.interceptor tokenExpiresOn', tokenExpiresOn.toString());
        console.log('auth.interceptor refreshTokenExpiresOn', refreshTokenExpiresOn.toString());

        if (currentTime < tokenExpiresOn) {
          console.log('auth.interceptor addTokenHeader');
          authReq = this.addTokenHeader(req, token);
        } else if (currentTime < refreshTokenExpiresOn) {
          console.log('auth.interceptor REFRESH NOT TOKEN EXPIRED');
          return this._staffPortalAuth.refreshToken().pipe(mergeMap(response => {
            let newToken = this._tokenService.getAdalToken();
            console.log('auth.interceptor newToken', newToken);            
            let newAuthReq = this.addTokenHeader(req, newToken);

            return next.handle(newAuthReq).pipe(catchError(error => {
              if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/login-using-domain-credentials') && error.status === 401) {
                return this.handle401Error(authReq, next);
              }
              return throwError(error);
            }));
          }));
        }
      }
    }

    console.log('auth.interceptor token --- still', token);            
    //return next.handle(authReq);
    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/login-using-domain-credentials') && error.status === 401) {
        return this.handle401Error(authReq, next);
      }
      return throwError(error);
    }));
  }



  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this._tokenService.getAdalRefreshToken();

      if (token)
        return this._staffPortalAuth.refreshToken().pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this._tokenService.saveYodaToken(token.access_token);
            this.refreshTokenSubject.next(token.access_token);

            return next.handle(this.addTokenHeader(request, token.access_token));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this._tokenService.signOut();
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }



  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    console.log('auth.interceptor addTokenHeader -> request.headers', request.headers);
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

    /* for Node.js Express back-end */
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
  }
}