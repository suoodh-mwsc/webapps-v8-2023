import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { environment } from '../../../../../../environments/environment';
// API Data Services
import { MyLeaveService } from '../../../../../shared/services/leave/my-leave.service';
// Core Services
import { YodaCoreErrorHandlerService } from '../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-leave-details-common-view',
  templateUrl: './leave-details-common-view.component.html',
})
export class LeaveDetailsCommonViewComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Model Close Time Out
  toastrTimeOut: any = environment.appConfig.staffPortal.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.staffPortal.common.modelCloseTimeOut;
  // Request Status Description - Component View Type
  requestStatusDescriptionViewType: any = 'badge-full';
  // Wizard
  tabUi: any = {
    selectedTab: 'requestDetails',
    showRequestAttachment: true, disableRequestDetails: true, disableRequestHistory: false,
    disableRequestHandover: false, disableRequestAttachment: false,
  };
  // Parent Component Data
  @Input() request_item: any;


  constructor(
    private _toastr: ToastrService,
    private _myLeaveService: MyLeaveService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
  }

  ngOnInit() {
    this.selectTab('requestDetails');
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }


  // First Page Data from Server
  getRequestLeaveHistory(leaveId) {
    console.log('getRequestLeaveHistory data', leaveId);
    this.request_item.show_model_loader = true;
    this.request_item.history = [];
    this._myLeaveService.getStaffPortalLeaveRequestsHistoryById(leaveId).subscribe((data: any) => {
      console.log('getRequestLeaveHistory data', data);
      this.request_item.history = data.items;
      this.request_item.show_model_loader = false;
    }, (error: Response | any) => {
      console.log('getRequestLeaveHistory -> error', error);
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

  getRequestWorkHandOver() {
    console.log('getRequestWorkHandOver -> Start', this.request_item.work_handover);
    this.request_item.work_handover = [];
    this.request_item.show_model_loader = true;
    this._myLeaveService.getStaffPortalLeaveRequestsWorkHandOverById(this.request_item.data.leave_request_id).subscribe((data: any) => {
      console.log('getRequestWorkHandOver data', data);
      this.request_item.work_handover = data.items;
    }, (error: Response | any) => {
      console.log('getRequestWorkHandOver -> error', error);
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


  deleteHandover(handover) {
    console.log('deleteHandover data', handover);

    this.request_item.work_handover = [];
    this.request_item.show_model_loader = true;
    this._myLeaveService.getStaffPortalCancelWorkHandOverById(handover.work_handover_id).subscribe((data: any) => {
      console.log('deleteHandover data', data);
    }, (error: Response | any) => {
      console.log('deleteHandover -> error', error);
      if (error) {
        this._coreErrorHandler.handleError(error).then((apiError: any) => {
          this.request_item.general_api_error = apiError.general_api_error;
          this.request_item.model_state_error = apiError.model_state_error;
        });
      }
      this.request_item.show_model_loader = false;
      return throwError(new Error(error.status));
    });
    this.getRequestWorkHandOver();
  }


  closeModel() {
  }

  openMedicalCertificate(medicalCertificateLink) {
    window.open(medicalCertificateLink, "_blank");
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

  selectTab(step) {
    this.resetApiErrorModal('selectTab');
    console.log('selectTab -> step ', step);
    if (step === 'requestDetails') {
      this.tabUi.selectedTab = step;
      this.tabUi.disableRequestDetails = true;
      this.tabUi.disableRequestHandover = false;
      this.tabUi.disableRequestHistory = false;
      this.tabUi.disableRequestAttachment = false;
    } else if (step === 'requestHandover') {
      this.tabUi.selectedTab = step;
      this.tabUi.disableRequestDetails = false;
      this.tabUi.disableRequestHandover = true;
      this.tabUi.disableRequestHistory = false;
      this.tabUi.disableRequestAttachment = false;
    } else if (step === 'requestHistory') {
      this.tabUi.selectedTab = step;
      this.tabUi.disableRequestDetails = false;
      this.tabUi.disableRequestHandover = false;
      this.tabUi.disableRequestHistory = true;
      this.tabUi.disableRequestAttachment = false;
    } else if (step === 'requestAttachment') {
      this.tabUi.selectedTab = step;
      if (this.request_item.data.leave_request_medical_certificate_file_path) {
        this.tabUi.showRequestAttachment = true;
        this.tabUi.disableRequestDetails = false;
        this.tabUi.disableRequestHandover = false;
        this.tabUi.disableRequestHistory = false;
        this.tabUi.disableRequestAttachment = true;
      }
    }
  }
}
