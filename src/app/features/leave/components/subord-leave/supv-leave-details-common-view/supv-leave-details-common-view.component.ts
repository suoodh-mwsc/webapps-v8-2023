import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
// Env
import { environment } from '../../../../../../environments/environment';
// API Data Services
import { SubordinateLeaveService } from '../../../../../shared/services/leave/subordinate-leave.service';
// Core Services
import { YodaCoreErrorHandlerService } from '../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-supv-leave-details-common-view',
  templateUrl: './supv-leave-details-common-view.component.html',
})
export class SupvLeaveDetailsCommonViewComponent implements OnInit {

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
    private _subordinateLeaveService: SubordinateLeaveService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
  }

  ngOnInit() {
    this.selectTab('requestDetails');
  }


  // First Page Data from Server
  getRequestLeaveHistory(leaveId) {
    console.log('getRequestLeaveHistory data', leaveId);
    this.request_item.show_model_loader = true;
    this.request_item.history = [];
    this._subordinateLeaveService.getStaffPortalLeaveRequestsHistoryById(leaveId).subscribe((data: any) => {
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
    this._subordinateLeaveService.getStaffPortalLeaveRequestsWorkHandOverById(this.request_item.data.leave_request_id).subscribe((data: any) => {
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


  closeModel() {
  }

  openMedicalCertificate(medicalCertificateLink) {
    window.open(medicalCertificateLink, "_blank");
  }

  selectTab(step) {
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
