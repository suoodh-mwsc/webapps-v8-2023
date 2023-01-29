import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Adal8Service } from 'adal-angular8';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
// Env
import { environment } from '../../../../environments/environment';
// services
import { UiBaseService } from '../../services/ui-setup/ui-base.service';
// Services
import { TokenStorageService } from './../../services/token/token-storage.service';
import { AdalAuthService } from './../../services/auth/adal-auth.service';
import * as moment from 'moment';


const config = {
  tenant: environment.adalConfig.tenant,
  clientId: environment.adalConfig.clientId,
  popUp: environment.adalConfig.popUp,
  // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
  postLogoutRedirectUri: environment.adalConfig.postLogoutRedirectUri,
  navigateToLoginRequestUrl: environment.adalConfig.navigateToLoginRequestUrl
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profileName: any;
  profilePicture: any;

  displayName: any;
  displayPicture: any;

  
  constructor(
    private _tokenStorageService: TokenStorageService,
    private _cookieService: CookieService,
    private _router: Router,
    private _uiBaseService: UiBaseService,
    private _adalService: Adal8Service,
    private _adalAuthService: AdalAuthService,
    private _sanitizer: DomSanitizer) { }


  ngOnInit() {
    if (this._adalService.userInfo.authenticated) {
      console.log('Home ngOnInit -> adalService.userInfo.authenticated true :: ', this._adalService.userInfo.authenticated);
      this._adalService.acquireToken(this._adalService.config.loginResource).subscribe(token => {
        console.log('Home - ngOnInit ->  acquireToken ::', token);
        this._tokenStorageService.saveAdalAllTokenDetails(token);
        this._tokenStorageService.saveAdalToken(token);
      });
    } else {
      console.log('Home ngOnInit -> adalService.userInfo.authenticated false :: ', this._adalService.userInfo.authenticated);
    }
  }


  getDisplayProfile() {
    this.profileName = JSON.parse(localStorage.getItem('myProfile'));
    this.profilePicture = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + localStorage.getItem('myProfilePicture'));

    this.displayName = JSON.parse(localStorage.getItem('displayName'));
    this.displayPicture = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + localStorage.getItem('displayPicture'));
  }


  unlock() {
    console.log('unlock -> :: ')
    this.checkAdalAuth();
  }


  checkAdalAuth() {
    console.log('HomePage checkAdalAuth -> adalService.userInfo.authenticated true :: ', this._adalService);
    return new Promise((resolve, reject) => {
      if (this._adalService.userInfo.authenticated) {
        console.log('HomePage checkAdalAuth -> adalService.userInfo.authenticated true :: ', this._adalService.userInfo.authenticated);
        console.log('HomePage checkAdalAuth -> adalService.userInfo.authenticated true :: ', this._adalService.userInfo.profile.exp);

        var currentTime = moment();
        var tokenExpiresOn = moment(this._adalService.userInfo.profile.exp);
        console.log('HomePage checkAdalAuth -> currentTime :: ', currentTime);
        console.log('HomePage checkAdalAuth -> tokenExpiresOn :: ', tokenExpiresOn);

        if (currentTime < tokenExpiresOn) {
          console.log('HomePage checkAdalAuth -> TOKEN EXPIRED :: ');
        } else {
          console.log('HomePage checkAdalAuth -> TOKEN NOT EXPIRED :: ');
        }

        let cachedToken = this._adalService.getCachedToken(this._adalService.config.loginResource);
        console.log('HomePage checkAdalAuth -> cachedToken true :: ', cachedToken);
        // Save Token To Cookies and Subject
        this._adalAuthService.setAdalToken(cachedToken);
        resolve(cachedToken);
      } else {
        console.log('HomePage checkAdalAuth -> adalService.userInfo.authenticated false :: ', this._adalService.userInfo.authenticated);
        this._adalService.handleWindowCallback();
        this.adalInit().then(data => {
          console.log('HomePage checkAdalAuth -> adalInit - data ::', data);
          this._adalService.acquireToken(this._adalService.config.loginResource).subscribe(token => {
            console.log('HomePage - checkAdalAuth ->  acquireToken ::', token);
            // Save Token To Cookies and Subject
            this._adalAuthService.setAdalToken(token);
            resolve(token);
          });
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
}
