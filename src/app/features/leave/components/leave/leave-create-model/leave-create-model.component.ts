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
import { PaginationService } from '../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from '../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-leave-create-model',
  templateUrl: './leave-create-model.component.html',
})
export class LeaveCreateModelComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Model Close Time Out
  toastrTimeOut: any = environment.appConfig.staffPortal.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.staffPortal.common.modelCloseTimeOut;
  // Leave Type
  selectLeaveType: any;
  // Create New
  request_item: any = { disable_save_button: false, disable_skip_to_next_button: false, show_model_loader: false, api_update_available: false, model_state_error: [], general_api_error: '' };
  // API - View Component Data
  request_new: any = {
    absence_type_sap_id: '', taken_from: null, taken_to: null, additional_details: null, nature_of_sickness: null, is_self_certification: null, employee_id: null, selected_year: null
  };
  // API - View Component Data
  request_handover: any = { responsibilities: null, employee_id: null };
  // Steps - Create New & Send for Approval Switch
  tabUi: any = { request_created: false, request_add_work_handover: false, request_send_for_approval: false };
  // Parent Component Data
  @Input() request: any;
  @Input() requestUi: any;

  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();
  @Output() someEvent = new EventEmitter<any>();

  constructor(
    private _toastr: ToastrService,
    private _myLeaveService: MyLeaveService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
  }

  ngOnInit() {
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, this.modelCloseTimeOut);
  }

  ngOnDestroy() {
    this.viewConsoleLogApiErrorModal('ngOnDestroy');

    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  callParent(): void {
    this.someEvent.next({ empId: this.request.logged_in_profile.employee_id, year: this.request.current_year });
  }

  create() {
    this.request.api_update_available = true;
    this.resetApiErrorModal('');
    // create, add_handover, send_for_approval, disable_save
    this.setupCreateWizard('', '', '', true);
    this.request_item.show_model_loader = true;
    console.log('create -> selectLeaveType', this.selectLeaveType);
    this.request_new.absence_type_sap_id = this.selectLeaveType;
    console.log('create -> request_new.absence_type_sap_id', this.request_new.absence_type_sap_id);
    console.log('create -> request_new.taken_from', this.request_new.taken_from);
    console.log('create -> request_new.taken_to', this.request_new.taken_to);
    console.log('create -> request_new.additional_details', this.request_new.additional_details);
    console.log('create -> request_new.nature_of_sickness', this.request_new.nature_of_sickness);
    console.log('create -> request_new.is_self_certification', this.request_new.is_self_certification);
    this._myLeaveService.postStaffPortalLeaveRequest(
      {
        // leave_request_employee_id: '1222',
        leave_request_absence_type_sap_id: this.request_new.absence_type_sap_id,
        leave_request_taken_from: this.request_new.taken_from,
        leave_request_taken_to: this.request_new.taken_to,
        leave_request_additional_details: this.request_new.additional_details,
        // leave_request_nature_of_sickness: this.request_new.nature_of_sickness,
        // leave_request_is_self_certification: this.request_new.is_self_certification
      }
    ).subscribe((data: any) => {
      console.log('requestList data', data);
      this.request_new = data;
      this._toastr.info('Created', 'New Leave', { closeButton: true, timeOut: 3000, progressBar: true, enableHtml: true });
      // create, add_handover, send_for_approval, disable_save
      this.setupCreateWizard(true, '', '', true);
      this.request_item.show_model_loader = false;

    }, (error: Response | any) => {
      console.log('getMyLeaveRequestForPageOneOnly -> error', error);
      if (error) {
        this._coreErrorHandler.handleError(error).then((apiError: any) => {
          this.request_item.general_api_error = apiError.general_api_error;
          this.request_item.model_state_error = apiError.model_state_error;
        });
      }
      this.request_item.disable_save_button = true;
      this.request_item.show_model_loader = false;
      return throwError(new Error(error.status));
    });
  }

  saveHandover() {
    this.request.api_update_available = true;
    this.resetApiErrorModal('');
    // create, add_handover, send_for_approval, disable_save
    this.setupCreateWizard('', '', '', true);
    this.request_item.show_model_loader = true;
    this._myLeaveService.postStaffPortalLeaveWorkhandoverRequest(
      {
        leave_request_id: this.request_new.leave_request_id,
        responsibilities: this.request_handover.responsibilities,
        work_handover_employee_id: this.request_handover.employee_id,
      }
    ).subscribe((data: any) => {
      console.log('requestList data', data);
      this._toastr.info('Created', 'New Handover', { closeButton: true, timeOut: 3000, progressBar: true, enableHtml: true });
      // create, add_handover, send_for_approval, disable_save
      this.setupCreateWizard(true, true, '', true);
      this.request_item.show_model_loader = false;
    }, (error: Response | any) => {
      console.log('saveHandover -> error', error);
      if (error) {
        this._coreErrorHandler.handleError(error).then((apiError: any) => {
          this.request_item.general_api_error = apiError.general_api_error;
          this.request_item.model_state_error = apiError.model_state_error;
        });
      }
      // create, add_handover, send_for_approval, disable_save
      this.setupCreateWizard('', '', '', true);
      this.request_item.show_model_loader = false;
      return throwError(new Error(error.status));
    });
  }

  skipHandover() {
    this.request.api_update_available = true;
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;
    this.request_item.show_model_loader = false;
    // create, add_handover, send_for_approval, disable_save
    this.setupCreateWizard(true, true, '', false);
  }

  sendForApproval() {
    this.request.api_update_available = true;
    this.resetApiErrorModal('');
    // create, add_handover, send_for_approval, disable_save
    this.setupCreateWizard('', '', '', true);
    this.request_item.show_model_loader = true;
    this._myLeaveService.postStaffPortalLeaveRequestSendForApproval(this.request_new.leave_request_id).subscribe((data: any) => {
      console.log('create data', data);
      setTimeout(() => {
        // Closing model with timeout
        this.closeModel();
      }, this.modelCloseTimeOut);
      this._toastr.success('Leave Request', 'Request send for supervisor Approval', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      // create, add_handover, send_for_approval, disable_save
      this.setupCreateWizard(false, false, false, false);
      this.request_item.show_model_loader = false;
    }, (error: Response | any) => {
      console.log('getMyLeaveRequestForPageOneOnly -> error', error);
      if (error) {
        this._coreErrorHandler.handleError(error).then((apiError: any) => {
          this.request_item.general_api_error = apiError.general_api_error;
          this.request_item.model_state_error = apiError.model_state_error;
        });
      }
      // create, add_handover, send_for_approval, disable_save
      this.setupCreateWizard('', '', '', false);
      this.request_item.show_model_loader = false;
      return throwError(new Error(error.status));
    });
  }

  skipSendForApproval() {
    this.request.api_update_available = true;
    this.request_item.show_model_loader = true;
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = false;
    setTimeout(() => {
      this.closeModel();
    }, this.modelCloseTimeOut);
  }

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    this.request.selected_year = moment(event, "YYYY-MM-DD").year();
    console.log('year', moment(event, "YYYY-MM-DD").year());
    console.log('request.logged_in_profile.employee_id', this.request.logged_in_profile.employee_id);
    this.callParent();
    console.log('onChangeEvent 400', event);
    console.log('onChangeEvent ->', this.selectLeaveType);
    this.resetApiErrorModal('');
    // create, add_handover, send_for_approval, disable_save
    this.setupCreateWizard('', '', '', false);
  }

  onChangeEventForType(event: any) {
    this.resetApiErrorModal('');
    // create, add_handover, send_for_approval, disable_save
    this.setupCreateWizard('', '', '', false);
  }


  // create, add_handover, send_for_approval
  setupCreateWizard(create, add_handover, send_for_approval, disable_save) {
    console.log('setupCreateWizard create', create);
    console.log('setupCreateWizard add_handover', add_handover);
    console.log('setupCreateWizard send_for_approval', send_for_approval);
    console.log('setupCreateWizard disable_save', disable_save);
    if (create === '') {
    } else if (create === true) {
      this.tabUi.request_created = true;
    } else if (create === false) {
      this.tabUi.request_created = false;
    }

    if (add_handover === '') {
    } else if (create === true) {
      this.tabUi.request_add_work_handover = true;
    } else if (create === false) {
      this.tabUi.request_add_work_handover = false;
    }

    if (send_for_approval === '') {
    } else if (create === true) {
      this.tabUi.request_send_for_approval = true;
    } else if (create === false) {
      this.tabUi.request_send_for_approval = false;
    }

    if (disable_save === '') {
    } else if (disable_save === true) {
      this.request_item.disable_save_button = true;
    } else if (disable_save === false) {
      this.request_item.disable_save_button = false;
    }

  }

  closeModel() {
    // this.visible = !this.visible;
    this.resetApiErrorModal('');
    this.request_new.absence_type_sap_id = '';
    this.request_new.taken_from = '';
    this.request_new.taken_to = '';
    this.request_new.additional_details = '';
    this.request_new.leave_request_id = '';
    this.request_handover.responsibilities = '';
    this.request_handover.employee_id = '';
    // create, add_handover, send_for_approval, disable_save
    this.setupCreateWizard(false, false, false, false);
    this.closeThisModel.emit(null);
  }

  resetApiErrorModal(functionName) {
    // create, add_handover, send_for_approval, disable_save
    this.setupCreateWizard('', '', '', false);
    this.request_item.model_state_error = [];
    this.request_item.general_api_error = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> model_state_error - ', this.request_item.model_state_error);
    console.log(functionName, ' -> general_api_error - ', this.request_item.general_api_error);
  }
}
