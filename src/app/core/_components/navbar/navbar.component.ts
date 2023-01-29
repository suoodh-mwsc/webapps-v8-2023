import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from "@angular/common";
import { Observable, Subject, throwError, interval, Subscription } from 'rxjs';
import { takeWhile, switchMap, map } from 'rxjs/operators';
import * as moment from 'moment';
// Env 
import { environment } from './../../../../environments/environment';
// Services
import { TokenStorageService } from './../../services/token/token-storage.service';
import { EmployeeConfigService } from './../../../shared/services/config/employee-config.service';
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public focus;
  public listTitles: any[];
  public location: Location;
  sidenavOpen: boolean = true;

  profile: any = { avatar: null, avatar_path: null, name: null }

  displayPicture: any;
  displayName: any;

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
    location: Location,
    private element: ElementRef,
    private router: Router,
    private _employeeConfig: EmployeeConfigService,
    private _tokenStorageService: TokenStorageService,
    private sanitizer: DomSanitizer,
  ) {
    this.profile.name = JSON.parse(localStorage.getItem('displayName'));
    this.profile.avatar = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + localStorage.getItem('displayPicture'));
    this.profile.avatar_path = localStorage.getItem('displayProfilePicturePath');

    this.location = location;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator

      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator

        if (window.innerWidth < 1200) {
          document.body.classList.remove("g-sidenav-pinned");
          document.body.classList.add("g-sidenav-hidden");
          this.sidenavOpen = false;
        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });

  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    this.getApprovals();
    this.getNotifications();
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  openSearch() {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  }
  closeSearch() {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  }
  openSidebar() {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
      this.sidenavOpen = false;
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
      this.sidenavOpen = true;
    }
  }
  toggleSidenav() {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
      this.sidenavOpen = false;
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
      this.sidenavOpen = true;
    }
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
      this._employeeConfig.getPendingApprovalCount().subscribe((data: any) => {
        // this._localStorageService.setLocalStorage('pendingApprovalNotificationList-SupervisorPortal', JSON.stringify(data));
        this.pendingApprovalNotificationList = data.items;
        this.showLoader = false;
        console.log('getApprovals -> API Call', 'start', this.pendingApprovalNotificationList);
        this.getCount();
      }, (error: Response | any) => {
        this.showLoader = false;
        return throwError(new Error(error.status));
      });
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
        this._employeeConfig.getPendingApprovalCount().subscribe((data: any) => {
          // this._localStorageService.setLocalStorage('pendingApprovalNotificationList-SupervisorPortal', JSON.stringify(data));
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
      this._employeeConfig.getPendingNotificationCount(this.notificationPageNo, this.notificationPageSize).subscribe((data: any) => {
        // this._localStorageService.setLocalStorage('pendingNotificationList', JSON.stringify(data));
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
        this._employeeConfig.getPendingNotificationCount(this.notificationPageNo, this.notificationPageSize).subscribe((data: any) => {
          // this._localStorageService.setLocalStorage('pendingNotificationList', JSON.stringify(data));

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
    this._tokenStorageService.getLogOut();
  }

}
