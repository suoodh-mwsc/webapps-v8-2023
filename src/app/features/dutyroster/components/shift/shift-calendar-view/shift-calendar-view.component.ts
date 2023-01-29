import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import * as moment from 'moment';
declare var $: any;
// Env
import { environment } from './../../../../../../environments/environment';
// Action Models
// import { EServiceUserActionComponent } from '../e-service-user-action/e-service-user-action.component';
// API Data Services
import { DutyRosterHrService } from './../../../../../shared/services/duty-roster/duty-roster-hr.service';
// Core Services
import { YodaCoreErrorHandlerService } from './../../../../../core/services/error-handler/yoda-core-error-handler.service';

@Component({
  selector: 'app-shift-calendar-view',
  templateUrl: './shift-calendar-view.component.html',
  styleUrls: ['./shift-calendar-view.component.scss']
})
export class ShiftCalendarViewComponent implements OnInit, OnDestroy, AfterViewInit {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // API - View Component Data
  request_item: any = {
    selected_application: [], selected_user: [], accounts: [], notifications: [], applications: [],
    notification_pagesize: 100, notification_number: 1,
    show_model_loader: false, api_update_available: false, model_state_error: [], general_api_error: ''
  };
  // Parent Component Data
  @Input() request: any;
  @Input() requestUi: any;
  // Reset Fields - Call Child Function
  @ViewChild('ViewModalBackdrop', { static: false }) ViewModalBackdrop: ElementRef;
  @ViewChild('ViewActionModal', { static: false }) ViewActionModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  // Reset Fields - Call Child Function
  // @ViewChild(EServiceUserActionComponent, { static: false }) EServiceUserActionComponent: EServiceUserActionComponent;
  // Wizard
  tabUi: any = {
    selectedTab: 'requestAccounts', disableRequestAccounts: true, disableRequestNotifications: false, disableRequestApplications: false
  };

  constructor(
    private _router: Router,
    private _toastr: ToastrService,
    private _dutyRosterHr: DutyRosterHrService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
  }


  ngOnInit() {
    console.log('view:: ngOnInit routeParams -> this.request.user_access ::', this.request.user_access);
  }


  selectTab(step) {
    this.resetApiErrorModal('selectTab');
    console.log('selectTab -> step ', step);
    if (step === 'requestAccounts') {
      this.tabUi.selectedTab = step;
      this.tabUi.disableRequestAccounts = true;
      this.tabUi.disableRequestNotifications = false;
      this.tabUi.disableRequestApplications = false;
    } else if (step === 'requestNotifications') {
      this.tabUi.selectedTab = step;
      this.tabUi.disableRequestAccounts = false;
      this.tabUi.disableRequestNotifications = true;
      this.tabUi.disableRequestApplications = false;
      this.getNotifications();
    } else if (step === 'requestApplications') {
      this.tabUi.selectedTab = step;
      this.tabUi.disableRequestAccounts = false;
      this.tabUi.disableRequestNotifications = false;
      this.tabUi.disableRequestApplications = true;
      this.getApplications();
    }
  }


  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }


  ngAfterViewInit() {
    // this.EServiceUserActionComponent.resetApiErrorModal('fromParent');
    // this.EServiceUserActionComponent.resetSelectedActionModal('fromParent');
  }


  hideViewActionModal() {
  }



  getRequestForDelete(requestData) {
    this.request_item.show_model_loader = true;
    this.request_item.notifications.items = [];
    this._dutyRosterHr.getShiftGroupDeleteById(requestData.Id).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
      console.log('getRequestForDelete data', data);
      let _toastr_title = 'Deleted';
      let _toastr_msg = 'Shiftgroup ' + requestData.Name + ' Deleted';
      this._toastr.warning(_toastr_msg, _toastr_title, { closeButton: true, timeOut: 3000, progressBar: true, enableHtml: true });
      requestData.IsDeleted = true;
      this.request_item.show_model_loader = false;
    }, (error: Response | any) => {
      console.log('getRequestForDelete error', error);
      if (error) {
        this._coreErrorHandler.handleError(error).then((apiError: any) => {
          this.request.general_api_error = apiError.general_api_error;
          this.request.model_state_error = apiError.model_state_error;
        });
      }
      this.request_item.show_model_loader = false;
      return throwError(new Error(error.status));
    });
  }

  getRequestForRestore(requestData) {
    this.request_item.show_model_loader = true;
    this.request_item.notifications.items = [];
    this._dutyRosterHr.getShiftGroupRestoreById(requestData.Id).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
      console.log('getRequestForDelete data', data);
      let _toastr_title = 'Restored';
      let _toastr_msg = 'Shiftgroup ' + requestData.Name + ' Restored';
      this._toastr.success(_toastr_msg, _toastr_title, { closeButton: true, timeOut: 3000, progressBar: true, enableHtml: true });
      requestData.IsDeleted = false;
      this.request_item.show_model_loader = false;
    }, (error: Response | any) => {
      console.log('getRequestForDelete error', error);
      if (error) {
        this._coreErrorHandler.handleError(error).then((apiError: any) => {
          this.request.general_api_error = apiError.general_api_error;
          this.request.model_state_error = apiError.model_state_error;
        });
      }
      this.request_item.show_model_loader = false;
      return throwError(new Error(error.status));
    });
  }


  goToCreateShift(requestData) {
    this._router.navigate(['/dutyroster/shift', requestData.Id]);
  }

  getNotifications() {
    // this.request_item.show_model_loader = true;
    // this.request_item.notifications.items = [];
    // this._dutyRosterHr.postePortalUserNotifications(
    //   {
    //     'Username': this.request_item.selected_user.UserName,
    //     'PageSize': this.request_item.notification_pagesize,
    //     'PageNumber': this.request_item.notification_number
    //   }
    // ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
    //   console.log('requestList data', data);
    //   // Closing the alert - apiRequest Info
    //   setTimeout(() => {
    //     $('#apiRequest-info-alert').alert('close');
    //   }, 4000);
    //   data.Result.forEach(ele => {
    //     this.request_item.notifications.push(ele);
    //   });
    //   this.request_item.show_model_loader = false;
    // }, (error: Response | any) => {
    //   if (error) {
    //     this._coreErrorHandler.handleError(error).then((apiError: any) => {
    //       this.request.general_api_error = apiError.general_api_error;
    //       this.request.model_state_error = apiError.model_state_error;
    //     });
    //   }
    //   this.request_item.show_model_loader = false;
    //   return throwError(new Error(error.status));
    // });
  }


  getApplications() {
    // this.request_item.show_model_loader = true;
    // this.request_item.notifications.items = [];
    // this._dutyRosterHr.postePortalUserSearch(
    //   {
    //     'Username': this.request_item.selected_user.UserName,
    //     'PageSize': this.request_item.notification_pagesize,
    //     'PageNumber': this.request_item.notification_number
    //   }
    // ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
    //   console.log('requestList data', data);
    //   // Closing the alert - apiRequest Info
    //   setTimeout(() => {
    //     $('#apiRequest-info-alert').alert('close');
    //   }, 4000);
    //   data.Result.forEach(ele => {
    //     this.request_item.notifications.push(ele);
    //   });
    //   this.request_item.show_model_loader = false;
    // }, (error: Response | any) => {
    //   if (error) {
    //     this._coreErrorHandler.handleError(error).then((apiError: any) => {
    //       this.request.general_api_error = apiError.general_api_error;
    //       this.request.model_state_error = apiError.model_state_error;
    //     });
    //   }
    //   this.request_item.show_model_loader = false;
    //   return throwError(new Error(error.status));
    // });
  }


  delete(requestData) {
    console.log('selectAccount -> requestData ', requestData);
  }


  selectAccount(requestData) {
    this.request_item.selected_application = requestData;
    console.log('selectAccount -> this.request_item.selected_application ', this.request_item.selected_application);
  }


  resetApiErrorModal(functionName) {
    this.ngAfterViewInit();
    this.request_item.model_state_error = [];
    this.request_item.general_api_error = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }


  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> model_state_error - ', this.request_item.model_state_error);
    console.log(functionName, ' -> general_api_error - ', this.request_item.general_api_error);
  }


  // Request Refresh API Data
  requestToRefresh(functionName) {
    if (this.request_item.api_update_available === true) {
      console.log('requestToRefresh -> Changes Available');
      console.log(functionName, ' -> requestToRefresh - ', this.requestToRefreshApiData);
      this.requestToRefreshApiData.emit(null);
      console.log(functionName, ' -> requestToRefresh - ', this.requestToRefreshApiData);
      this.request_item.api_update_available = false;
    } else {
      console.log('requestToRefresh -> Changes Not Available');
    }
  }

}
