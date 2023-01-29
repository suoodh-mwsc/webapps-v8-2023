import { Injectable } from '@angular/core';
import { Adal8HTTPService, Adal8Service, Adal8Interceptor } from 'adal-angular8';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber, Subject, interval, Subscription, of } from 'rxjs';
import { retry, catchError, tap, map, filter, mergeMap, first } from 'rxjs/operators';
//
import { TokenStorageService } from "./../token/token-storage.service";
import { StaffPortalAuthService } from "./../auth/staff-portal-auth.service";
// Models
import { YodaUser } from '../../_models';
// Enviroment
import { environment } from './../../../../environments/environment';

const config = {
  tenant: environment.adalConfig.tenant,
  clientId: environment.adalConfig.clientId,
  popUp: environment.adalConfig.popUp,
  // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
  postLogoutRedirectUri: environment.adalConfig.postLogoutRedirectUri,
  navigateToLoginRequestUrl: environment.adalConfig.navigateToLoginRequestUrl
};

@Injectable({
  providedIn: 'root'
})
export class AdalAuthService {

  // ADAL - user
  private adalUserSubject: BehaviorSubject<any>;
  public adalUser: Observable<any>;
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  // ADAL - token
  public adalTokenSubject: BehaviorSubject<any>;
  public adalToken: Observable<any>;


  constructor(

    private _staffPortalAuth: StaffPortalAuthService,
    private _adalService: Adal8Service,
    private _tokenStorageService: TokenStorageService) {
    this.adalTokenSubject = new BehaviorSubject<any>(this._tokenStorageService.getAdalToken());
    this.adalToken = this.adalTokenSubject.asObservable();
  }


  async checkAdalAuth() {
    console.log('AdalAuthService checkAdalAuth -> this._adalService :: ', this._adalService);
    return new Promise((resolve, reject) => {
      if (this._adalService.userInfo.authenticated) {
        console.log('AdalAuthService checkAdalAuth -> adalService.userInfo.authenticated true :: ', this._adalService.userInfo.authenticated);
        console.log('AdalAuthService checkAdalAuth -> adalService.userInfo.authenticated true :: ', this._adalService.userInfo.profile.exp);
        let cachedToken = this._adalService.getCachedToken(this._adalService.config.loginResource);
        console.log('AdalAuthService checkAdalAuth -> cachedToken true :: ', cachedToken);
        this._tokenStorageService.saveAdalToken(cachedToken);
        resolve(cachedToken);
      } else {
        console.log('AdalAuthService checkAdalAuth -> adalService.userInfo.authenticated false :: ', this._adalService.userInfo.authenticated);
        this._adalService.handleWindowCallback();
        this.adalInit().then(data => {
          console.log('AdalAuthService checkAdalAuth -> adalInit - data ::', data);
          this._adalService.acquireToken(this._adalService.config.loginResource).subscribe(token => {
            console.log('AdalAuthService - checkAdalAuth ->  acquireToken ::', token);
            resolve(token);
          });
          // let cachedToken = this._adalService.getCachedToken(this._adalService.config.loginResource);
          // console.log('AdalAuthService - checkAdalAuth ->  getCachedToken ::', cachedToken);
        });
      }
    });
  }


  async adalLogin() {
    console.log('AdalAuthService checkAdalAuth -> adalService.userInfo.authenticated true :: ', this._adalService);
    return new Promise((resolve, reject) => {
      if (this._adalService.userInfo.authenticated) {
        console.log('AdalAuthService checkAdalAuth -> adalService.userInfo.authenticated true :: ', this._adalService.userInfo.authenticated);
        let cachedToken = this._adalService.getCachedToken(this._adalService.config.loginResource);
        console.log('AdalAuthService checkAdalAuth -> cachedToken true :: ', cachedToken);
        this._tokenStorageService.saveAdalToken(cachedToken);
        resolve(cachedToken);
      } else {
        console.log('AdalAuthService checkAdalAuth -> adalService.userInfo.authenticated false :: ', this._adalService.userInfo.authenticated);
        this._adalService.handleWindowCallback();
        this.adalInit().then(data => {
          console.log('AdalAuthService checkAdalAuth -> adalInit - data ::', data);
          this._adalService.acquireToken(this._adalService.config.loginResource).subscribe(token => {
            console.log('AdalAuthService - checkAdalAuth ->  acquireToken ::', token);
            resolve(token);
          });
          // let cachedToken = this._adalService.getCachedToken(this._adalService.config.loginResource);
          // console.log('AdalAuthService - checkAdalAuth ->  getCachedToken ::', cachedToken);
        });
      }
    });
  }


  adalInit() {
    console.log('AdalAuthService ->  adalInit ::');
    return new Promise(resolve => {
      const adalConfig = this._adalService.login();
      resolve(adalConfig);
    });
  }

  setAdalToken(token) {
    console.log('AdalAuthService - setAdalToken ->  token ::', token);
    console.log('AdalAuthService - Save Token To Cookies and Subject ::');
    this._tokenStorageService.saveAdalToken(token);
    this.adalTokenSubject.next(token);
    this._staffPortalAuth.postGetCoreApiToken(token, 'staff-portal');
  }

  getAdalToken() {
    console.log('AdalAuthService - getAdalToken ->  token ::');
    return this._tokenStorageService.getAdalToken();
  }
}
