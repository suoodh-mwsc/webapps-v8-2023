import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Adal8Service } from 'adal-angular8';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
// Env
import { environment } from '../../../../environments/environment';
// services
import { UiBaseService } from '../../services/ui-setup/ui-base.service';


const config = {
  tenant: environment.adalConfig.tenant,
  clientId: environment.adalConfig.clientId,
  popUp: environment.adalConfig.popUp,
  // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
  postLogoutRedirectUri: environment.adalConfig.postLogoutRedirectUri,
  navigateToLoginRequestUrl: environment.adalConfig.navigateToLoginRequestUrl
};


@Component({
  selector: 'app-error-unauthorized',
  templateUrl: './error-unauthorized.component.html',
  styleUrls: ['./error-unauthorized.component.scss']
})
export class ErrorUnauthorizedComponent implements OnInit {

  profileName: any;
  profilePicture: any;

  displayName: any;
  displayPicture: any;

  constructor(
    private _cookieService: CookieService,
    private router: Router,
    private uiBaseService: UiBaseService,
    public adalService: Adal8Service,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.adalService.userInfo.authenticated) {
      console.log('unauthorized ngOnInit -> adalService.userInfo.authenticated true :: ', this.adalService.userInfo.authenticated);
      this.getDisplayProfile();
    } else {
      console.log('unauthorized ngOnInit -> adalService.userInfo.authenticated false :: ', this.adalService.userInfo.authenticated);
    }
  }


  getDisplayProfile() {
    this.profileName = JSON.parse(localStorage.getItem('myProfile'));
    this.profilePicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + localStorage.getItem('myProfilePicture'));

    this.displayName = JSON.parse(localStorage.getItem('displayName'));
    this.displayPicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + localStorage.getItem('displayPicture'));
  }


  unlock() {
    console.log('unlock -> :: ')
  }
}
