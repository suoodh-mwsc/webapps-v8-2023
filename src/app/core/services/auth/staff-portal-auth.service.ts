import { Injectable } from '@angular/core';
import { Adal8HTTPService, Adal8Service, Adal8Interceptor } from 'adal-angular8';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { TokenStorageService } from "./../token/token-storage.service";
import { EventBusService } from './../event-bus/event-bus.service';
import { Observable, BehaviorSubject, throwError, Subscriber, Subject, interval, Subscription, of } from 'rxjs';
import { catchError, first, map, retry, tap, filter, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Env
import { environment } from 'src/environments/environment';
// Models
import { YodaUser } from './../../_models';
//
import { UiBaseService } from '../ui-setup/ui-base.service';


@Injectable({
  providedIn: 'root'
})
export class StaffPortalAuthService {

  // Yoda Core - User
  private yodaUserSubject: BehaviorSubject<any>;
  public yodaUser: Observable<any>;
  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private _tokenStorageService: TokenStorageService,
    private _uiBaseService: UiBaseService,
    private _http: HttpClient,
    private _router: Router) {
  }

  setYodaToken(token) {
    console.log('staff-portal-auth - setYodaToken ->  token ::', token);
    console.log('staff-portal-auth - Save Token To Cookies and Subject ::');
    this._tokenStorageService.saveYodaAllTokenDetails(token);
    this._tokenStorageService.saveYodaUser(token);
    this._tokenStorageService.saveYodaToken(token.access_token);
    // this.yodaUserSubject.next(token);
  }

  getYodaToken() {
    console.log('staff-portal-auth - getYodaToken ->  token ::');
    return this._tokenStorageService.getYodaToken();
  }


  public postGetCoreApiToken(azureToken, azureDevice) {
    console.log('staff-portal-auth - postCoreApiToken -> azureToken ::', azureToken);
    console.log('staff-portal-auth - postCoreApiToken -> azureDevice ::', azureDevice);

    return new Promise((resolve, reject) => {
      this.postCoreApiToken(
        {
          azure_token: azureToken,
          device: azureDevice,
        }
      ).pipe().subscribe((tokenInfo: any) => {
        console.log('staff-portal-auth - postCoreApiToken -> value ::', tokenInfo);
        this.setYodaToken(tokenInfo)
        //this._router.navigate(['/staff-portal/calender']);

        this._uiBaseService.getMyProfile();
        resolve(tokenInfo);
        return tokenInfo;
      }, (error: Response | any) => {
        console.log('staff-portal-auth - postCoreApiToken -> error ::', error);
        return throwError(new Error(error.status));
      });
    });
  }


  refreshToken() {
    const user = this._tokenStorageService.getYodaAllTokenDetails();
    const httpOptions = this.prepareOptions();
    // console.log('refreshToken ->   user : ', user);
    let body;

    if (user.YODA_TOKEN_KEY) {
      // console.log('refreshToken body -> user.TOKEN_KEY : ', user.TOKEN_KEY);
      // console.log('refreshToken body -> user.REFRESHTOKEN_KEY : ', user.REFRESHTOKEN_KEY);
      body = {
        access_token: user.YODA_TOKEN_KEY,
        refresh_token: user.YODA_REFRESHTOKEN_KEY,
      }
    }

    let data = JSON.stringify(body);

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/auth/login-using-refresh-token`, data, httpOptions)
      .pipe(map((userTokenData: any) => {
        console.log('refreshToken -> userTokenData ::', userTokenData);
        this._tokenStorageService.saveYodaToken(userTokenData.access_token);
        this._tokenStorageService.saveYodaAllTokenDetails(userTokenData);
        return userTokenData;
      }, catchError((error: any) => {
        console.log('refreshToken -> error', error);
        return throwError(error || 'Server error');
      })));//.toPromise();
  }




  private prepareOptions(): any {
    console.log('staff-portal-auth - prepareOptions -> :: ');
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json');
    return { headers };
  }


  postCoreApiToken(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);

    return this._http.post<any>(`${environment.staffAppApiConfig.api_url}v1/auth/login-using-azure-adal`, body, httpOptions)
      .pipe(map(userData => {
        console.log('staff-portal-auth - postCoreApiToken -> userData ::', userData);
        return userData;
      },
        catchError((error: any) => {
          console.log('staff-portal-auth - postCoreApiToken -> error ::', error);
          return throwError(error || 'Server error');
        })
      ));
  }

}
