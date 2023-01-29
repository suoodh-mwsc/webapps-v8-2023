import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

const ADAL_TOKEN_ALL_DETAILS = 'adal-auth-details';
const ADAL_TOKEN_KEY = 'adal-auth-token';
const ADAL_TOKEN_EXPIRY = 'adal-access-token-expiry';
const ADAL_REFRESHTOKEN_KEY = 'adal-auth-refresh-token';
const ADAL_REFRESHTOKEN_EXPIRY = 'adal-access-token-expiry';
const ADAL_USER = 'adal-auth-user';


const YODA_TOKEN_ALL_DETAILS = 'yoda-auth-details';
const YODA_TOKEN_KEY = 'yoda-auth-token';
const YODA_TOKEN_EXPIRY = 'yoda-access-token-expiry';
const YODA_REFRESHTOKEN_KEY = 'yoda-auth-refresh-token';
const YODA_REFRESHTOKEN_EXPIRY = 'yoda-access-token-expiry';
const YODA_USER = 'yoda-auth-user';

const API_TOKEN = 'api-token';
const API_TOKEN_EXPIRY = 'api-token-expiry';
const API_REFRESH_TOKEN = 'api-refresh-token';
const API_REFRESH_TOKEN_EXPIRY = 'api-refresh-token-expiry';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private _cookieService: CookieService,
    private _router: Router
  ) { }


  signOut(): void {
    // window.sessionStorage.clear();
    this._cookieService.deleteAll();
  }


  public saveAdalAllTokenDetails(tokenData) {
    this._cookieService.delete(ADAL_TOKEN_KEY);
    this._cookieService.set(ADAL_TOKEN_KEY, tokenData.access_token);

    this._cookieService.delete(ADAL_TOKEN_EXPIRY);
    this._cookieService.set(ADAL_TOKEN_EXPIRY, tokenData.access_token_expires_on);

    this._cookieService.delete(ADAL_REFRESHTOKEN_KEY);
    this._cookieService.set(ADAL_REFRESHTOKEN_KEY, tokenData.refresh_token);

    this._cookieService.delete(ADAL_REFRESHTOKEN_EXPIRY);
    this._cookieService.set(ADAL_REFRESHTOKEN_EXPIRY, tokenData.refresh_token_expires_on);
  }


  public saveAdalUser(tokenData) {
    this._cookieService.delete(ADAL_USER);
    this._cookieService.set(ADAL_USER, tokenData);
  }


  public getAdalUser(): any | null {
    return this._cookieService.get(ADAL_USER);
    // let adalUser = JSON.parse(this._cookieService.get(ADAL_USER));
    // return adalUser;
  }


  public saveAdalToken(token: string): void {
    this._cookieService.delete(ADAL_TOKEN_KEY);
    this._cookieService.set(ADAL_TOKEN_KEY, token);
  }


  public getAdalToken(): string | null {
    return this._cookieService.get(ADAL_TOKEN_KEY);
  }

  public getAdalAllTokenDetails() {
    return {
      ADAL_TOKEN_KEY: this._cookieService.get(ADAL_TOKEN_KEY),
      ADAL_TOKEN_EXPIRY: this._cookieService.get(ADAL_TOKEN_EXPIRY),
      ADAL_REFRESHTOKEN_KEY: this._cookieService.get(ADAL_REFRESHTOKEN_KEY),
      ADAL_REFRESHTOKEN_EXPIRY: this._cookieService.get(ADAL_REFRESHTOKEN_EXPIRY)
    };;
  }

  public saveAdalRefreshToken(token: string): void {
    this._cookieService.delete(ADAL_REFRESHTOKEN_KEY);
    this._cookieService.set(ADAL_REFRESHTOKEN_KEY, token);
    console.log("New Service reponse - saveRefreshToken", token);
  }

  public getAdalRefreshToken(): string | null {
    return this._cookieService.get(ADAL_REFRESHTOKEN_KEY);

  }


  // public saveUser(user: any): void {
  //   this._cookieService.delete(USER_KEY);
  //   this._cookieService.set(USER_KEY, JSON.stringify(user));
  // }


  // public getUser(): any {
  //   const user = this._cookieService.get(USER_KEY);
  //   if (user) {
  //     return JSON.parse(user);
  //   }
  //   return {};
  // }


  public saveYodaAllTokenDetails(tokenData) {
    this._cookieService.delete(YODA_TOKEN_KEY);
    this._cookieService.set(YODA_TOKEN_KEY, tokenData.access_token);

    this._cookieService.delete(YODA_TOKEN_EXPIRY);
    this._cookieService.set(YODA_TOKEN_EXPIRY, tokenData.access_token_expires_on);

    this._cookieService.delete(YODA_REFRESHTOKEN_KEY);
    this._cookieService.set(YODA_REFRESHTOKEN_KEY, tokenData.refresh_token);

    this._cookieService.delete(YODA_REFRESHTOKEN_EXPIRY);
    this._cookieService.set(YODA_REFRESHTOKEN_EXPIRY, tokenData.refresh_token_expires_on);
  }


  public saveYodaUser(tokenData) {
    this._cookieService.delete(YODA_USER);
    this._cookieService.set(YODA_USER, tokenData);
  }

  public getYodaUser(): any | null {
    return this._cookieService.get(YODA_USER);
    // let yodaUser = JSON.parse(this._cookieService.get(YODA_USER));
    // return yodaUser;
  }

  public saveYodaToken(token: string): void {
    this._cookieService.delete(YODA_TOKEN_KEY);
    this._cookieService.set(YODA_TOKEN_KEY, token);
  }


  public getYodaToken(): string | null {
    return this._cookieService.get(YODA_TOKEN_KEY);;
  }

  public getYodaAllTokenDetails() {
    return {
      YODA_TOKEN_KEY: this._cookieService.get(YODA_TOKEN_KEY),
      YODA_TOKEN_EXPIRY: this._cookieService.get(YODA_TOKEN_EXPIRY),
      YODA_REFRESHTOKEN_KEY: this._cookieService.get(YODA_REFRESHTOKEN_KEY),
      YODA_REFRESHTOKEN_EXPIRY: this._cookieService.get(YODA_REFRESHTOKEN_EXPIRY)
    };
  }

  public saveYodaRefreshToken(token: string): void {
    this._cookieService.delete(YODA_REFRESHTOKEN_KEY);
    this._cookieService.set(YODA_REFRESHTOKEN_KEY, token);
    console.log("New Service reponse - saveRefreshToken", token);
  }

  public getYodaRefreshToken(): string | null {
    return this._cookieService.get(YODA_REFRESHTOKEN_KEY);
  }

  public getApiToken(): string | null {
    return this._cookieService.get(API_TOKEN);;
  }

  public saveAllApiTokenDetails(apiTokenData) {
    this._cookieService.delete(API_TOKEN);
    this._cookieService.delete(API_TOKEN_EXPIRY);
    this._cookieService.delete(API_REFRESH_TOKEN);
    this._cookieService.delete(API_REFRESH_TOKEN_EXPIRY);

    this._cookieService.set(API_TOKEN, apiTokenData.access_token);
    this._cookieService.set(API_TOKEN_EXPIRY, apiTokenData.access_token_expires_on);
    this._cookieService.set(API_REFRESH_TOKEN, apiTokenData.refresh_token);
    this._cookieService.set(API_REFRESH_TOKEN_EXPIRY, apiTokenData.refresh_token_expires_on);
  }

  public getAllApiTokenDetails() {
    return {
      API_TOKEN: this._cookieService.get(API_TOKEN),
      API_TOKEN_EXPIRY: this._cookieService.get(API_TOKEN_EXPIRY),
      API_REFRESH_TOKEN: this._cookieService.get(API_REFRESH_TOKEN),
      API_REFRESH_TOKEN_EXPIRY: this._cookieService.get(API_REFRESH_TOKEN_EXPIRY)
    };;
  }


  public getLogOut() {
    console.log('logout Start');
    this._cookieService.delete(YODA_TOKEN_KEY),
    this._cookieService.delete(YODA_TOKEN_EXPIRY),
    this._cookieService.delete(YODA_REFRESHTOKEN_KEY),
    this._cookieService.delete(YODA_REFRESHTOKEN_EXPIRY)
    this._cookieService.delete(API_TOKEN);
    this._cookieService.delete(API_TOKEN_EXPIRY);
    this._cookieService.delete(API_REFRESH_TOKEN);
    this._cookieService.delete(API_REFRESH_TOKEN_EXPIRY);
    this._cookieService.deleteAll();
    localStorage.clear();
    sessionStorage.clear();
    this._router.navigate(['/welcome']);
    console.log('logout End');
  }
}
