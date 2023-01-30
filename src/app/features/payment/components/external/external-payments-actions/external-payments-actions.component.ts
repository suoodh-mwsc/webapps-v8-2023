import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../../environments/environment';
// API Data Services
import { ExternalPaymentsService } from './../../../../../shared/services/payment/external-payments.service';
// Core Services
import { PaginationService } from './../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../../core/services/error-handler/yoda-core-error-handler.service';

@Component({
  selector: 'app-external-payments-actions',
  templateUrl: './external-payments-actions.component.html',
  styleUrls: ['./external-payments-actions.component.scss']
})
export class ExternalPaymentsActionsComponent implements OnInit, OnDestroy {

  // OnDestroy - Memory Leak Fix
  componentDestroyed$: Subject<boolean> = new Subject()
  // Timeout
  toastrTimeOut: any = environment.appConfig.staffPortal.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.staffPortal.common.modelCloseTimeOut;
  // Select Action
  selectActionType: any;
  // Reject Model
  sapReference: any;
  // Parent Component Data
  @Input() request_item: any;
  // Models
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private _toastr: ToastrService,
    private _externalPayments: ExternalPaymentsService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) { }

  ngOnInit() {
    this.resetSelectedActionModal('');
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  updatedToSap(selectedleaveData) {
    // this.request_item.api_update_available = true;

    // console.log('approveLeave data', selectedleaveData);
    // this.resetApiErrorModal('');
    // this.request_item.show_model_loader = true;
    // this._tppaPayments.postHRDeskLeaveRequestApprove(
    //   {
    //     leave_request_id: selectedleaveData.leave_request_id
    //   }
    // ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
    //   console.log('approveLeave data', data);
    //   this._toastr.success('Leave Accepted', 'Leave Request Approved', { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    //   this.request_item.show_model_loader = false;
    //   this.closeModel();
    // }, (error: Response | any) => {
    //   console.log('approveLeave -> error', error);
    //   if (error) {
    //     this._coreErrorHandler.handleError(error).then((apiError: any) => {
    //       this.request_item.general_api_error = apiError.general_api_error;
    //       this.request_item.model_state_error = apiError.model_state_error;
    //     });
    //   }
    //   this.request_item.show_model_loader = false;
    //   return throwError(new Error(error.status));
    // });
  }


  manuallyUpdatedToSap(requestedData) {
    this.request_item.api_update_available = true;

    console.log('manuallyUpdatedToSap data', requestedData);
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;
    this._externalPayments.postManuallyUpdateToSAP(
      {
        PaymentTransactionId: requestedData.Id,
        SAPReference: this.sapReference,
      }
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
      console.log('manuallyUpdatedToSap data', data);
      this._toastr.warning('Leave Rejected', 'Leave Request Rejected', { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
      this.request_item.show_model_loader = false;
      this.closeModel();
    }, (error: Response | any) => {
      console.log('manuallyUpdatedToSap -> error', error);
      if (error) {
        this._coreErrorHandler.handleError(error).then((apiError: any) => {
          this.request_item.general_api_error = apiError.general_api_error;
          this.request_item.model_state_error = apiError.model_state_error;
        });
      }
      this.request_item.show_model_loader = false;
      return throwError(new Error(error.status));
    });
  }

  changeAction(event) {
    this.selectActionType = event;
    this.resetApiErrorModal('changeAction');
  }

  onChangeEventForAction(event: any) {
    window.scrollTo(0, document.body.scrollHeight);
    this.resetApiErrorModal('');
  }

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    this.resetApiErrorModal('');
    this.closeThisModel.emit(null);
  }

  closeModel() {
    this.resetApiErrorModal('');
    this.request_item.data = [];
    this.closeThisModel.emit(null);
  }

  resetSelectedActionModal(functionName) {
    this.selectActionType = '';
    console.log(functionName, ' -> selectLeaveRequestActionType - ', this.selectActionType);
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
