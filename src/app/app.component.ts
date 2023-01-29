import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { UiBaseService } from './core/services/ui-setup/ui-base.service';
import { Adal8HTTPService, Adal8Service, Adal8Interceptor } from 'adal-angular8';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, Event as NavigationEvent } from '@angular/router';

import { TokenStorageService } from "./core/services/token/token-storage.service";
import { UiConfigService } from "./core/services/ui-config/ui-config.service";
import { EventBusService } from './core/services/event-bus/event-bus.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

//
import { AdalAuthService } from './core/services/auth/adal-auth.service';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'WebApps V3';

  // Environment Config
  info_card: any = {
    app_env: '', api_env: '', env_type: '', app_version: '', show_card: false,
  };

  username?: string;
  eventBusSub?: Subscription;

  isLoggedIn = false;
  isAuthenticated = false;

  adalUser: any;
  yodaUser: any;

  configUi: any = [];

  event$;

  constructor(
    private _router: Router,
    private _tokenStorageService: TokenStorageService,
    private _eventBusService: EventBusService,
    private _uiBaseService: UiBaseService,
    private _uiConfigService: UiConfigService,
    private _adalService: Adal8Service,
    private _adalAuthService: AdalAuthService) {
    this._adalService.init(config);

    console.log('Home Route', this._router.routerState.snapshot.url);



    this.configUi = [
      { id: 101, is_supervisor_portal: false, page_title_friendly: 'My Payslip', page_title: 'ui-view-payslip', view_type: 'card' },
      { id: 102, is_supervisor_portal: false, page_title_friendly: 'My Letter', page_title: 'ui-view-letter', view_type: 'card' },
      { id: 201, is_supervisor_portal: false, page_title_friendly: 'My Prior Approval', page_title: 'ui-view-prior-approval', view_type: 'card' },
      { id: 202, is_supervisor_portal: false, page_title_friendly: 'My Overtime', page_title: 'ui-view-overtime', view_type: 'card' },
      { id: 210, is_supervisor_portal: true, page_title_friendly: 'Subordinate Prior Approval', page_title: 'ui-view-supv-prior-approval', view_type: 'card' },
      { id: 211, is_supervisor_portal: true, page_title_friendly: 'Subordinate Overtime', page_title: 'ui-view-supv-overtime', view_type: 'card' },
      { id: 301, is_supervisor_portal: false, page_title_friendly: 'My Leave', page_title: 'ui-view-leave', view_type: 'card' },
      { id: 302, is_supervisor_portal: false, page_title_friendly: 'My Work Handover', page_title: 'ui-view-handover', view_type: 'card', avatar_settings: false, show_avatar: false },
      { id: 310, is_supervisor_portal: true, page_title_friendly: 'Subordinate Leave', page_title: 'ui-view-supv-leave', view_type: 'card' },
      { id: 401, is_supervisor_portal: false, page_title_friendly: 'Pending Work Handover', page_title: 'ui-view-pending-handover', view_type: 'table', avatar_settings: true, show_avatar: false },
      { id: 402, is_supervisor_portal: false, page_title_friendly: 'Pending Prior Approval', page_title: 'ui-view-pending-prior-approval', view_type: 'table', avatar_settings: true, show_avatar: false },
      { id: 403, is_supervisor_portal: false, page_title_friendly: 'Pending Overtime Approval', page_title: 'ui-view-pending-overtime', view_type: 'table', avatar_settings: true, show_avatar: false },
      { id: 404, is_supervisor_portal: false, page_title_friendly: 'Pending Leave Approval', page_title: 'ui-view-pending-leave', view_type: 'table', avatar_settings: true, show_avatar: false },
    ]

    this._uiConfigService.saveUiConfig(this.configUi);


    this.info_card.app_env = environment.staffAppApiConfig.api_server;
    this.info_card.api_env = environment.staffAppApiConfig.api_url;
    this.info_card.env_type = environment.production;
    this.info_card.app_version = environment.appVersion;


    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        window.scrollTo(0, 0);
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });


    this.event$ = this._router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        console.log('Home Url ::', event.url);
        if (event.url === '/' && this._adalService.userInfo.authenticated) {
          this._router.navigate(['/general/my-calendar']);
        } else {
        }
      }
    });


    // this._authService.adalUser.subscribe(x => {
    //   this.adalUser = x
    // });

    // this._authService.yodaUser.subscribe(x => {
    //   this.yodaUser = x
    // });

    console.log('AppComponent constructor : this.adalUser ::', this.adalUser);
    console.log('AppComponent constructor : this.yodaUser ::', this.yodaUser);
  }


  ngOnInit() {
    this.eventBusSub = this._eventBusService.on('logout', () => {
      this.logout();
    });

    this.checkAdalAuth();
  }


  checkAdalAuth() {
    console.log('AdalAuthService checkAdalAuth -> adalService.userInfo.authenticated true :: ', this._adalService);
    return new Promise((resolve, reject) => {
      if (this._adalService.userInfo.authenticated) {
        console.log('AdalAuthService checkAdalAuth -> adalService.userInfo.authenticated true :: ', this._adalService.userInfo.authenticated);
        console.log('AdalAuthService checkAdalAuth -> adalService.userInfo.authenticated true :: ', this._adalService.userInfo.profile.exp);

        var currentTime = moment();
        var tokenExpiresOn = moment(this._adalService.userInfo.profile.exp);
        console.log('AdalAuthService checkAdalAuth -> currentTime :: ', currentTime);
        console.log('AdalAuthService checkAdalAuth -> tokenExpiresOn :: ', tokenExpiresOn);

        if (currentTime < tokenExpiresOn) {
          console.log('AdalAuthService checkAdalAuth -> TOKEN EXPIRED :: ');
        } else {
          console.log('AdalAuthService checkAdalAuth -> TOKEN NOT EXPIRED :: ');
        }

        let cachedToken = this._adalService.getCachedToken(this._adalService.config.loginResource);
        console.log('AdalAuthService checkAdalAuth -> cachedToken true :: ', cachedToken);
        // Save Token To Cookies and Subject
        this._adalAuthService.setAdalToken(cachedToken);
        resolve(cachedToken);
      } else {
        console.log('AdalAuthService checkAdalAuth -> adalService.userInfo.authenticated false :: ', this._adalService.userInfo.authenticated);
        this._adalService.handleWindowCallback();
        this.adalInit().then(data => {
          console.log('AdalAuthService checkAdalAuth -> adalInit - data ::', data);
          this._adalService.acquireToken(this._adalService.config.loginResource).subscribe(token => {
            console.log('AdalAuthService - checkAdalAuth ->  acquireToken ::', token);
            // Save Token To Cookies and Subject
            this._adalAuthService.setAdalToken(token);
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


  checkIsLoggedIn() {
    // return this._authService.getisLoggedIn();
  }


  logout(): void {
    this._tokenStorageService.signOut();
    this.isLoggedIn = false;
    window.location.reload();
  }


  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }
}
