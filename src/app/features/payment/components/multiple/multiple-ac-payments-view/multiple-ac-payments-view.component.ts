import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import * as moment from 'moment';
declare var $: any;
// Env
import { environment } from './../../../../../../environments/environment';
// Action Models
// import { EServiceUserActionComponent } from '../e-service-user-action/e-service-user-action.component';
// API Data Services
import { MultipleAccountPaymentsService } from './../../../../../shared/services/payment/multiple-account-payments.service';
// Core Services
import { YodaCoreErrorHandlerService } from './../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-multiple-ac-payments-view',
  templateUrl: './multiple-ac-payments-view.component.html',
  styleUrls: ['./multiple-ac-payments-view.component.scss']
})
export class MultipleAcPaymentsViewComponent implements OnInit, OnDestroy, AfterViewInit {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // API - View Component Data
  request_item: any = {
    selected_transaction: [], utility_payments: [], selected_user: [], accounts: [], notifications: [], applications: [],
    notification_pagesize: 100, notification_number: 1,
    show_model_loader: false, api_update_available: false, model_state_error: [], general_api_error: ''
  };
  // Parent Component Data
  @Input() request: any;
  @Input() requestUi: any;
  @Input() filter: any;
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
    private _multipleAccountPayments: MultipleAccountPaymentsService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
  }


  ngOnInit() {

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
    } else if (step === 'requestApplications') {
      this.tabUi.selectedTab = step;
      this.tabUi.disableRequestAccounts = false;
      this.tabUi.disableRequestNotifications = false;
      this.tabUi.disableRequestApplications = true;
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
    this.requestToRefresh('hideViewActionModal');
    this.resetApiErrorModal('hideViewActionModal');
    console.log('hideViewActionModal');
    this.ViewModalBackdrop.nativeElement.className = '';
    this.ViewActionModal.nativeElement.className = '';
    this.ViewActionModal.nativeElement.style = 'display: none;';
  }


  showViewActionModal(requestData) {
    this.resetApiErrorModal('showViewActionModal');
    // this.request_item.data = requestData;
    // this.getRequestHistory(requestData.payment_id);
    this.getRequestDetails(requestData)
    this.resetApiErrorModal('');
    this.ViewModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.ViewActionModal.nativeElement.className = 'modal fade show';
    this.ViewActionModal.nativeElement.style = 'display: block;';
  }



  getRequestHistory(requestData) {
    // this.request_item.show_model_loader = true;
    // this.request_item.history = [];
    // this._tppaPayments.getTppaPaymentsHistoryDetails(requestData).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
    //   console.log('getRequestHistory data', data);
    //   this.request_item.history = data.items;
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



  getRequestDetails(requestData) {
    this.request_item.show_model_loader = true;
    this.request_item.notifications.items = [];
    this._multipleAccountPayments.getMultipleAccountPaymentDetailsByPaymentId(requestData.Id)
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getRequestDetails data', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        this.request_item.data = data;
        this.request_item.utility_payments = data.UtilityPayments;
        this.request_item.show_model_loader = false;
      }, (error: Response | any) => {
        if (error) {
          console.log('getRequestDetails error', error);
          this._coreErrorHandler.handleError(error).then((apiError: any) => {
            this.request.general_api_error = apiError.general_api_error;
            this.request.model_state_error = apiError.model_state_error;
          });
        }
        this.request_item.show_model_loader = false;
        return throwError(new Error(error.status));
      });
  }

  selectTransaction(requestData) {
    this.request_item.selected_user = requestData;
    this.request_item.selected_transaction = requestData;
    console.log('ngOnInit -> this.request_item.selected_transaction ', this.request_item.selected_transaction);
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
