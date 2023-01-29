import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
declare var $: any;
import { environment } from '../../../../../../environments/environment';
// API Data Services
import { MyLeaveService } from '../../../../../shared/services/leave/my-leave.service';
// Core Services
import { YodaCoreErrorHandlerService } from '../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-work-handover-action-model',
  templateUrl: './work-handover-action-model.component.html',
})
export class WorkHandoverActionModelComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Time Out
  toastrTimeOut: any = environment.appConfig.staffPortal.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.staffPortal.common.modelCloseTimeOut;
  // Form
  rejectReason: any;
  // Select Action
  selectActionType: any;
  // Parent Component Data
  @Input() request_item: any;
  // Model Close
  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private _toastr: ToastrService,
    private _myLeaveService: MyLeaveService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.resetApiErrorModal('ngOnInit');
      this.resetSelectedActionModal('ngOnInit');
    }, 1000);
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);;
    this.componentDestroyed$.complete();;
  }

  onChangeEventForAction(event: any) {
    this.request_item.model_state_error = [];
    this.request_item.general_api_error = null;
  }


  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    this.resetApiErrorModal('onChangeEvent');
  }

  closeModel() {
    this.closeThisModel.emit(null);
    this.resetApiErrorModal('closeModel');
  }

  resetSelectedActionModal(functionName) {
    this.selectActionType = '';
    console.log(functionName, ' -> selectActionType - ', this.selectActionType);
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
