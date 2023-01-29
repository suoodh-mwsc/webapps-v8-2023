import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
declare var $: any;
// Env
import { environment } from '../../../../../../environments/environment';
// API Data Services
import { SubordinateLeaveService } from '../../../../../shared/services/leave/subordinate-leave.service';
// Core Services
import { YodaCoreErrorHandlerService } from '../../../../../core/services/error-handler/yoda-core-error-handler.service';

@Component({
  selector: 'app-supv-leave-action-model',
  templateUrl: './supv-leave-action-model.component.html',
})
export class SupvLeaveActionModelComponent implements OnInit {

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

  constructor(
    private _toastr: ToastrService,
    private _subordinateLeaveService: SubordinateLeaveService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
  }

  ngOnInit() {
    this.resetApiErrorModal('');
    this.selectLeaveRequestActionType = null;
  }


  sendForSupervisorApproval(selectedleaveData) {
    console.log('sendForSupervisorApproval data', selectedleaveData);
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;
    this._subordinateLeaveService.postStaffPortalLeaveRequestSendForApproval(selectedleaveData.leave_request_id).subscribe((data: any) => {
      console.log('sendForSupervisorApproval data', data);
      this._toastr.info('Leave Request', 'Send for Approval', { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
      this.request_item.show_model_loader = false;
      this.request_item.api_update_available = true;
      this.closeModel();
    }, (error: Response | any) => {
      console.log('sendForSupervisorApproval -> error', error);
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


  saveHandover() {
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;
    this._subordinateLeaveService.postStaffPortalLeaveWorkhandoverRequest(
      {
        leave_request_id: this.request_item.data.leave_request_id,
        responsibilities: this.request_new.responsibilities,
        work_handover_employee_id: this.request_new.workhandover_employee_Id,
      }
    ).subscribe((data: any) => {
      console.log('requestList data', data);
      this._toastr.info('Leave Request - Handover ', 'New Handover Created', { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
      setTimeout(() => {
        // Closing model with timeout
        this.closeModel();
      }, 2000);
      // this.getRequestWorkHandOver();
      this.request_item.show_model_loader = false;
      this.request_item.api_update_available = true;
    }, (error: Response | any) => {
      console.log('saveHandover -> error', error);
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

  cancelLeave(selectedleaveData) {
    console.log('cancelLeave -> selectedleaveData', selectedleaveData);
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;
    this._subordinateLeaveService.postStaffPortalLeaveRequestCancel(selectedleaveData.leave_request_id).subscribe((data: any) => {
      console.log('cancelLeave data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      setTimeout(() => {
        // Closing model with timeout
        this.closeModel();
      }, this.modelCloseTimeOut);
      this._toastr.warning('Leave Request', 'Request cancelled', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.request_item.show_model_loader = false;
      this.request_item.api_update_available = true;
    }, (error: Response | any) => {
      console.log('cancelLeave -> error', error);
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


  recall(selectedleaveData) {
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;
    this._subordinateLeaveService.postStaffPortalLeaveRequestRecall(selectedleaveData.leave_request_id).subscribe((data: any) => {
      console.log('recall data', data);
      this._toastr.info('Leave Request', 'Request Recalled', { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
      this.closeModel();
      this.request_item.show_model_loader = false;
      this.request_item.api_update_available = true;
    }, (error: Response | any) => {
      console.log('recall -> error', error);
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


  shortenLeave(selectedleaveData) {
    console.log('shortenLeave data', selectedleaveData);
    console.log('shortenLeave data', selectedleaveData.leave_request_id);
    console.log('shortenLeave request_new.expiry_date', this.request_new.expiry_date);
    this.resetApiErrorModal('onChangeEvent');
    this.request_item.show_model_loader = true;
    this._subordinateLeaveService.postStaffPortalLeaveRequestShorten(
      {
        leave_request_id: selectedleaveData.leave_request_id,
        leave_request_shorten_to_date: this.request_new.expiry_date
      }
    ).subscribe((data: any) => {
      console.log('shortenLeave data', data);
      this._toastr.info('Leave Shorten', 'Send for Shorten Leave', { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
      this.closeModel();
      this.request_item.show_model_loader = false;
      this.request_item.api_update_available = true;
    }, (error: Response | any) => {
      console.log('shortenLeave -> error', error);
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
    this.selectLeaveRequestActionType = event;
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
    this.selectLeaveRequestActionType = '';
    console.log(functionName, ' -> selectLeaveRequestActionType - ', this.selectLeaveRequestActionType);
  }

  resetApiErrorModal(functionName) {
    this.request_item.model_state_error = [];
    this.request_item.model_state_error = [];
    this.request_item.general_api_error = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> request_item.model_state_error - ', this.request_item.model_state_error);
    console.log(functionName, ' -> request_item.general_api_error - ', this.request_item.general_api_error);
  }
}
