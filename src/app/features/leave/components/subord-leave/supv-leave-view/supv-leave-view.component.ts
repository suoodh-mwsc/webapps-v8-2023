import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;
// Env
import { environment } from '../../../../../../environments/environment';
// Action Models
import { SupvLeaveActionModelComponent } from '../supv-leave-action-model/supv-leave-action-model.component';
// API Data Services
import { SubordinateLeaveService } from '../../../../../shared/services/leave/subordinate-leave.service';
// Core Services
import { PaginationService } from '../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from '../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-supv-leave-view',
  templateUrl: './supv-leave-view.component.html',
})
export class SupvLeaveViewComponent implements OnInit {

  uiButton: any = environment.appConfig.staffPortal.leaveRequests.buttons;
  // Request Status Description - Component View Type
  requestStatusDescriptionViewType: any = 'badge-trim-30';
  // Leave temp 
  leave_request_absence_type_description_temp: any;
  // API - View Component Data
  request_item: any = { data: [], history: [], work_handover: [], show_model_loader: false, api_update_available: false, model_state_error: [], general_api_error: '' };
  // Parent Component Data
  @Input() request: any;
  @Input() requestUi: any;
  // Reset Fields - Call Child Function
  @ViewChild('ViewModalBackdrop', { static: false }) ViewModalBackdrop: ElementRef;
  @ViewChild('ViewActionModal', { static: false }) ViewActionModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  @ViewChild(SupvLeaveActionModelComponent, { static: false }) LeaveActionModelComponent: SupvLeaveActionModelComponent;

  constructor(
    private _subordinateLeaveService: SubordinateLeaveService) {
  }

  ngOnInit() {
    this.resetApiErrorModal('');
  }

  ngAfterViewInit() {
    this.LeaveActionModelComponent.resetApiErrorModal('fromParent');
    this.LeaveActionModelComponent.resetSelectedActionModal('fromParent');
  }

  hideViewActionModal() {
    // $('#ViewActionModal').modal('hide');
    this.ViewModalBackdrop.nativeElement.className = '';
    this.ViewActionModal.nativeElement.className = '';
    this.ViewActionModal.nativeElement.style = 'display: none;';
  }

  showViewActionModal(leaveRequest) {
    this.request_item.data = leaveRequest;
    this.getRequestLeaveHistory(leaveRequest.leave_request_id);
    this.getRequestWorkHandOver(leaveRequest.leave_request_id);
    console.log('ViewActionModal -> request_item.data', this.request_item.data);
    console.log('ViewActionModal ->      request_item.history', this.request_item.history);
    // $('#ViewActionModal').modal('show');
    this.ViewModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.ViewActionModal.nativeElement.className = 'modal fade show';
    this.ViewActionModal.nativeElement.style = 'display: block;';
  }


  // First Page Data from Server
  getRequestLeaveHistory(leaveId) {
    this.request_item.history = [];
    console.log('getRequestLeaveHistory data', leaveId);
    this.request_item.show_model_loader = true;
    this._subordinateLeaveService.getStaffPortalLeaveRequestsHistoryById(leaveId).subscribe((data: any) => {
      console.log('getRequestLeaveHistory data', data);
      this.request_item.history = data.items;
      this.request_item.show_model_loader = false;
    }, (error: Response | any) => {
      console.log('getRequestLeaveHistory -> error', error);
      this.request_item.show_model_loader = false;
      return throwError(new Error(error.status));
    });
  }

  getRequestWorkHandOver(leaveId) {
    this.request_item.work_handover = [];
    console.log('getRequestWorkHandOver Card -> data', leaveId);
    this.request_item.show_model_loader = true;
    this._subordinateLeaveService.getStaffPortalLeaveRequestsWorkHandOverById(leaveId).subscribe((data: any) => {
      console.log('getRequestWorkHandOver Card data', data);
      this.request_item.work_handover = data.items;
      this.request_item.show_model_loader = false;
    }, (error: Response | any) => {
      console.log('getRequestWorkHandOver Card -> error', error);
      this.request_item.show_model_loader = false;
      return throwError(new Error(error.status));
    });
  }


  getAbsenceTypeDescriptionAvatorColorCode(leaveRequest) {
    if (leaveRequest.leave_request_absence_type_description.includes('Annual') || leaveRequest.leave_request_absence_type_description.includes('annual')) {
      return 'btn-facebook';
    }
    if (leaveRequest.leave_request_absence_type_description.includes('Medical') || leaveRequest.leave_request_absence_type_description.includes('medical')) {
      return 'btn-twitter';
    }
    if (leaveRequest.leave_request_absence_type_description.includes('Compassionate') || leaveRequest.leave_request_absence_type_description.includes('compassionate')) {
      return 'btn-google-plus';
    }
    if (leaveRequest.leave_request_absence_type_description.includes('Circumcision') || leaveRequest.leave_request_absence_type_description.includes('circumcision')) {
      return 'btn-pinterest';
    }
    if (leaveRequest.leave_request_absence_type_description.includes('Paternity') || leaveRequest.leave_request_absence_type_description.includes('paternity')) {
      return 'btn-youtube';
    }
    if (leaveRequest.leave_request_absence_type_description.includes('Maternity') || leaveRequest.leave_request_absence_type_description.includes('maternity')) {
      return 'btn-instagram';
    }
  }

  getAbsenceTypeDescriptionAvatorTextColorCode(leaveRequest) {
    if (leaveRequest.leave_request_absence_type_description.includes('Annual') || leaveRequest.leave_request_absence_type_description.includes('annual')) {
      this.leave_request_absence_type_description_temp = 'A'
      return this.leave_request_absence_type_description_temp;
    }
    if (leaveRequest.leave_request_absence_type_description.includes('Medical') && leaveRequest.leave_request_is_self_certification === null || leaveRequest.leave_request_absence_type_description.includes('Medical') && leaveRequest.leave_request_is_self_certification === null) {
      this.leave_request_absence_type_description_temp = 'Mc'
      return this.leave_request_absence_type_description_temp;
    }
    if (leaveRequest.leave_request_absence_type_description.includes('Medical') && leaveRequest.leave_request_is_self_certification != null || leaveRequest.leave_request_absence_type_description.includes('Medical') && leaveRequest.leave_request_is_self_certification != null) {
      this.leave_request_absence_type_description_temp = 'Ms'
      return this.leave_request_absence_type_description_temp;
    }
    if (leaveRequest.leave_request_absence_type_description.includes('Compassionate') || leaveRequest.leave_request_absence_type_description.includes('compassionate')) {
      this.leave_request_absence_type_description_temp = 'Co'
      return this.leave_request_absence_type_description_temp;
    }
    if (leaveRequest.leave_request_absence_type_description.includes('Circumcision') || leaveRequest.leave_request_absence_type_description.includes('circumcision')) {
      this.leave_request_absence_type_description_temp = 'Ci'
      return this.leave_request_absence_type_description_temp;
    }
    if (leaveRequest.leave_request_absence_type_description.includes('Paternity') || leaveRequest.leave_request_absence_type_description.includes('paternity')) {
      this.leave_request_absence_type_description_temp = 'P'
      return this.leave_request_absence_type_description_temp;
    }
    if (leaveRequest.leave_request_absence_type_description.includes('Maternity') || leaveRequest.leave_request_absence_type_description.includes('maternity')) {
      this.leave_request_absence_type_description_temp = 'M'
      return this.leave_request_absence_type_description_temp;
    }
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
