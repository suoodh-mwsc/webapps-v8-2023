import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { environment } from './../../../../../../environments/environment'
// API Data Services
// import { MyLeaveService } from './../../../../../shared/services/leave/my-leave.service';
// Core Services
import { YodaCoreErrorHandlerService } from './../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-e-service-user-action',
  templateUrl: './e-service-user-action.component.html',
  styleUrls: ['./e-service-user-action.component.scss']
})
export class EServiceUserActionComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Model Close Time Out
  toastrTimeOut: any = environment.appConfig.staffPortal.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.staffPortal.common.modelCloseTimeOut;
  // Select Action
  selectLeaveRequestActionType: any;
  // API - View Component Data
  request_new: any = { responsibilities: '', workhandover_employee_Id: '', expiry_date: '' };
  // Parent Component Data
  @Input() request_item: any;
  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.viewConsoleLogApiErrorModal('ngOnDestroy');
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  closeModel() {
    this.closeThisModel.emit(null);
    this.resetApiErrorModal('closeModel');
  }

  resetSelectedActionModal(functionName) {
    this.selectLeaveRequestActionType = '';
    console.log(functionName, ' -> selectLeaveRequestActionType - ', this.selectLeaveRequestActionType);
  }

  resetApiErrorModal(functionName) {
    this.request_item.model_state_error = [];
    this.request_item.general_api_error = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> request_item.model_state_error - ', this.request_item.model_state_error);
    console.log(functionName, ' -> request_item.general_api_error - ', this.request_item.general_api_error);
  }
}
