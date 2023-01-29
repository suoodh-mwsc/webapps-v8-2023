import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
// Env
import { environment } from './../../../../../../environments/environment';
// Storage
import { LocalStorageService } from './../../../../services/local-storage/local-storage.service';
// Services - API
// import { SupvPortalEmployeeBaseService } from './../../../../../orchestra/supervisor-portal/shared/services/supv-portal-employee-base.service';
// import { SupvPortalApprovalBaseService } from './../../../../../orchestra/supervisor-portal/shared/services/supv-portal-approval-base.service';
import { EmployeeConfigService } from './../../../../../shared/services/config/employee-config.service';


@Component({
  selector: 'app-core-layout-pending-approvals',
  templateUrl: './core-layout-pending-approvals.component.html',
  styleUrls: ['./core-layout-pending-approvals.component.scss']
})
export class CoreLayoutPendingApprovalsComponent implements OnInit {

  // totalCount: any;
  // pendingApprovalNotificationList: any;
  // pendingApprovalNotificationType: any;
  // showLoader: boolean;

  @Input() totalCount: any;
  @Input() pendingApprovalNotificationList: any;
  @Input() pendingApprovalNotificationType: any;
  @Input() showLoader: boolean;

  constructor(
    private _cookieService: CookieService,
    private _localStorageService: LocalStorageService,
    private _employeeConfigService: EmployeeConfigService) {
    // this.getApprovals();
  }


  ngOnInit() {

  }


  getCount() {
    this.totalCount = 0;
    this.pendingApprovalNotificationList.forEach(ele => {
      this.totalCount += ele.request_count;
    });
  }



  getApprovals() {
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
  }

}
