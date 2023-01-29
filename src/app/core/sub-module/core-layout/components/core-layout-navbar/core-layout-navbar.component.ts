import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable, Subject, throwError, interval, Subscription } from 'rxjs';
import { takeWhile, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';
declare var $: any;
import { CookieService } from 'ngx-cookie-service';
// Env
import { environment } from './../../../../../../environments/environment';
// Storage
import { LocalStorageService } from './../../../../services/local-storage/local-storage.service';
// Services - Core
import { TokenStorageService } from "./../../../../services/token/token-storage.service";
import { EmployeeConfigService } from './../../../../../shared/services/config/employee-config.service';


const YODA_TOKEN_KEY = 'yoda-auth-token';
const YODA_TOKEN_EXPIRY = 'yoda-access-token-expiry';
const YODA_REFRESHTOKEN_KEY = 'yoda-auth-refresh-token';
const YODA_REFRESHTOKEN_EXPIRY = 'yoda-access-token-expiry';

const API_TOKEN = 'api-token';
const API_TOKEN_EXPIRY = 'api-token-expiry';
const API_REFRESH_TOKEN = 'api-refresh-token';
const API_REFRESH_TOKEN_EXPIRY = 'api-refresh-token-expiry';


@Component({
  selector: 'app-core-layout-navbar',
  templateUrl: './core-layout-navbar.component.html',
  styleUrls: ['./core-layout-navbar.component.scss']
})
export class CoreLayoutNavbarComponent implements OnInit {

  // App Title
  selectedAppTitle: any = '';
  selectedAppIcon: any = '';

  @Input() appTitle: any;
  @Input() displayName: any;
  @Input() displayPicture: any;
  @Input() displayPicturePath: any;

  // @Input() pendingApprovalNotificationList: any;
  // @Input() pendingApprovalNotificationType: any;
  // @Input() showLoader: boolean;



  totalCount: any;
  pendingApprovalNotificationList: any;
  pendingApprovalNotificationType: any;
  showLoader: boolean;

  // Notifications
  totalNotificationCount: any;
  pendingNotificationList: any;
  pendingNotificationListPagination: any;
  notificationPageNo: any = 1;
  notificationPageSize: any = 5;
  // Notifications - Format Array
  notificationFilter: any;
  formatDate: any;

  subscription: Subscription;

  constructor(
    private _router: Router,
    private _tokenStorageService: TokenStorageService,
    private _cookieService: CookieService,
    private _localStorageService: LocalStorageService,
    private _employeeConfigService: EmployeeConfigService) {
    this.getApprovals();
    this.getNotifications();
    // this.displayPicturePath = 'https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture-from-du?&domain_id=DU10031222';
    console.log('app-core-layout-navbar -> ', this.displayPicturePath);
  }

  ngOnInit() {
    this.getApprovals();
    this.getNotifications();
  }

  getCount() {
    this.totalCount = 0;
    this.pendingApprovalNotificationList.forEach(ele => {
      this.totalCount += ele.request_count;
    });
  }

  getApprovals() {
    console.log('getApprovals ->', 'start');
    this.showLoader = true;
    this.pendingApprovalNotificationList = [];
    localStorage.removeItem('pendingApprovalNotificationList-SupervisorPortal');

    return new Promise((resolve, reject) => {
      this._employeeConfigService.getPendingApprovalCount().subscribe((data: any) => {
        // localStorage.setItem('pendingApprovalNotificationList-SupervisorPortal', JSON.stringify(data));
        this._localStorageService.setLocalStorage('pendingApprovalNotificationList-SupervisorPortal', JSON.stringify(data));

        // const cookieExists: boolean = this._cookieService.check('pendingApprovalNotificationList-SupervisorPortal');
        // if (cookieExists) {
        //   this._cookieService.delete('pendingApprovalNotificationList-SupervisorPortal');
        //   this._cookieService.set('pendingApprovalNotificationList-SupervisorPortal', JSON.stringify(data));
        // } else {
        //   this._cookieService.set('pendingApprovalNotificationList-SupervisorPortal', JSON.stringify(data));
        // }

        this.pendingApprovalNotificationList = data.items;
        this.showLoader = false;
        console.log('getApprovals -> API Call', 'start', this.pendingApprovalNotificationList);
        this.getCount();
      }, (error: Response | any) => {
        this.showLoader = false;
        return throwError(new Error(error.status));
      });
      // this.getApprovalsWithInterval();
      resolve(this.pendingApprovalNotificationList);
    });
  }

  refreshPendingApprovalCounter() {
    console.log('refreshCounter ->', 'Click');
    this.getApprovals();
  }

  getApprovalsWithInterval() {
    interval(150000).subscribe(x => {
      console.log('getApprovals ->', 'start');
      this.showLoader = true;
      this.pendingApprovalNotificationList = [];
      localStorage.removeItem('pendingApprovalNotificationList-SupervisorPortal');


      return new Promise((resolve, reject) => {
        this._employeeConfigService.getPendingApprovalCount().subscribe((data: any) => {
          // localStorage.setItem('pendingApprovalNotificationList-SupervisorPortal', JSON.stringify(data));
          this._localStorageService.setLocalStorage('pendingApprovalNotificationList-SupervisorPortal', JSON.stringify(data));

          // const cookieExists: boolean = this._cookieService.check('pendingApprovalNotificationList-SupervisorPortal');
          // if (cookieExists) {
          //   this._cookieService.delete('pendingApprovalNotificationList-SupervisorPortal');
          //   this._cookieService.set('pendingApprovalNotificationList-SupervisorPortal', JSON.stringify(data));
          // } else {
          //   this._cookieService.set('pendingApprovalNotificationList-SupervisorPortal', JSON.stringify(data));
          // }

          this.pendingApprovalNotificationList = data.items;
          this.showLoader = false;
          this.getCount();
          console.log('getApprovals', this.pendingApprovalNotificationList);
        }, (error: Response | any) => {
          this.showLoader = false;
          return throwError(new Error(error.status));
        });
        resolve(this.pendingApprovalNotificationList);
      });
    });
  }



  getNotifications() {
    console.log('getNotifications ->', 'start');
    this.showLoader = true;
    this.pendingNotificationList = [];
    localStorage.removeItem('pendingNotificationList');


    return new Promise((resolve, reject) => {
      this._employeeConfigService.getPendingNotificationCount(this.notificationPageNo, this.notificationPageSize).subscribe((data: any) => {
        // localStorage.setItem('pendingNotificationList', JSON.stringify(data));
        this._localStorageService.setLocalStorage('pendingNotificationList', JSON.stringify(data));

        // const cookieExists: boolean = this._cookieService.check('pendingNotificationList');
        // if (cookieExists) {
        //   this._cookieService.delete('pendingNotificationList');
        //   this._cookieService.set('pendingNotificationList', JSON.stringify(data));
        // } else {
        //   this._cookieService.set('pendingNotificationList', JSON.stringify(data));
        // }

        this.pendingNotificationListPagination = data;

        data.items.forEach(ele => {
          this.notificationFilter = [];
          this.formatDate = moment(ele.notification_created_on).fromNow();
          this.notificationFilter = {
            notification_category: ele.notification_category,
            notification_created_by: ele.notification_created_by,
            notification_created_on: this.formatDate,
            notification_created_on_friendly: ele.notification_created_on_friendly,
            notification_id: ele.notification_id,
            notification_is_read: ele.notification_is_read,
            notification_message: ele.notification_message,
            notification_recipient: ele.notification_recipient,
            notification_reference_id: ele.notification_reference_id,
            notification_sub_category: ele.notification_sub_category,
            notification_subscriber_types: ele.notification_subscriber_types,
            notification_title: ele.notification_title,

          }
          this.pendingNotificationList.push(this.notificationFilter);
        });


        // this.pendingNotificationList = data.items;
        this.showLoader = false;
        console.log('getNotifications -> API Call', 'start', this.pendingNotificationListPagination);
        this.getNotificationCount();
      }, (error: Response | any) => {
        this.showLoader = false;
        return throwError(new Error(error.status));
      });
      resolve(this.pendingNotificationList);
    });


    // this.getApprovalsWithInterval();
  }

  getNotificationCount() {
    this.totalNotificationCount = 0;
    this.totalNotificationCount = this.pendingNotificationList.length;
    // this.pendingNotificationList.forEach(ele => {
    //   // this.totalNotificationCount += ele.request_count;
    //   // pendingNotificationListPagination
    // });
  }

  refreshNotificationCounter() {
    console.log('refreshNotificationCounter ->', 'Click');
    this.getNotifications();
  }

  getNotificationWithInterval() {
    interval(150000).subscribe(x => {
      console.log('getApprovals ->', 'start');
      this.showLoader = true;
      this.pendingNotificationList = [];
      localStorage.removeItem('pendingNotificationList');


      return new Promise((resolve, reject) => {
        this._employeeConfigService.getPendingNotificationCount(this.notificationPageNo, this.notificationPageSize).subscribe((data: any) => {
          // localStorage.setItem('pendingNotificationList', JSON.stringify(data));
          this._localStorageService.setLocalStorage('pendingNotificationList', JSON.stringify(data));

          // const cookieExists: boolean = this._cookieService.check('pendingNotificationList');
          // if (cookieExists) {
          //   this._cookieService.delete('pendingNotificationList');
          //   this._cookieService.set('pendingNotificationList', JSON.stringify(data));
          // } else {
          //   this._cookieService.set('pendingNotificationList', JSON.stringify(data));
          // }

          this.pendingNotificationListPagination = data;
          data.items.forEach(ele => {
            this.notificationFilter = [];
            this.formatDate = moment(ele.notification_created_on).fromNow();
            this.notificationFilter = {
              notification_category: ele.notification_category,
              notification_created_by: ele.notification_created_by,
              notification_created_on: this.formatDate,
              notification_created_on_friendly: ele.notification_created_on_friendly,
              notification_id: ele.notification_id,
              notification_is_read: ele.notification_is_read,
              notification_message: ele.notification_message,
              notification_recipient: ele.notification_recipient,
              notification_reference_id: ele.notification_reference_id,
              notification_sub_category: ele.notification_sub_category,
              notification_subscriber_types: ele.notification_subscriber_types,
              notification_title: ele.notification_title,
            }
            this.pendingNotificationList.push(this.notificationFilter);
          });


          // this.pendingNotificationList = data.items;
          this.showLoader = false;
          this.getNotificationCount();
          console.log('getNotifications -> API Call', 'start', this.pendingNotificationListPagination);
        }, (error: Response | any) => {
          this.showLoader = false;
          return throwError(new Error(error.status));
        });
        resolve(this.pendingNotificationList);
      });
    });
  }

  logout() {
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
