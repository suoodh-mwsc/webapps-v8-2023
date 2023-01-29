import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import * as moment from 'moment';
import { environment } from '../../../../../../environments/environment';
// API Data Services
import { MyLeaveService } from '../../../../../shared/services/leave/my-leave.service';
// Core Services
import { YodaCoreErrorHandlerService } from '../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-medical-leave-create-model',
  templateUrl: './medical-leave-create-model.component.html',
})
export class MedicalLeaveCreateModelComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Time Out
  toastrTimeOut: any = environment.appConfig.staffPortal.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.staffPortal.common.modelCloseTimeOut;
  // Create New
  request_item: any = {
    data: [], history: [], work_handover: [], show_model_loader: false,
    disable_save_button: false, api_update_available: false, model_state_error: [], general_api_error: ''
  };
  // API - View Component Data
  request_new: any = {
    absence_type_sap_id: '9001', taken_from: null, taken_to: null, additional_details: null,
    include_doctor_consultation: true, nature_of_sickness: null, is_self_certification: null, selected_year: null
  };
  selectSelfCerification: boolean = true;
  selectMedicalLeaveType: any = 'Self Certification';
  // Create New
  fileList: File[] = [];
  responsibilities: any;
  workhandoverEmployeeId: any;
  // Create New & Send for Approval Switch
  requestCreated: boolean = false;
  requestAddWorkhandOver: boolean = false;
  requestSendForApproval: boolean = false;
  // Parent Component Data
  @Input() request: any;
  @Input() requestUi: any;
  @Input() newRequest: any;
  @Input() selectedEmployeeId: any;
  @Input() selectedEmployee: any;

  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private _myLeaveService: MyLeaveService,
    private _toastr: ToastrService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
  }

  ngOnInit() {
    console.log('ngOnInit this.request.leave_quota', this.request.leave_quota);
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, this.modelCloseTimeOut);
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  setSelfCerification(check) {
    this.getLeaveQuotaFromSap();
    console.log('setSelfCerification', check);
    if (check === 'Self Certification') {
      this.request_new.include_doctor_consultation = false;
      this.request_new.absence_type_sap_id = '9001';
    } else if (check === 'Medical Certificate') {
      this.request_new.include_doctor_consultation = true;
      this.request_new.absence_type_sap_id = '9001';
    }
  }

  createLeave() {
    this.request_item.disable_save_button = true;
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;
    if (this.selectMedicalLeaveType === 'Self Certification') {
      this.request_new.is_self_certification = true;
    }
    // this.request_new.absence_type_sap_id = this.selectMedicalLeaveType;
    console.log('create -> selectMedicalLeaveType', this.selectMedicalLeaveType);
    console.log('create -> request_new.absence_type_sap_id', this.request_new.absence_type_sap_id);
    console.log('create -> request_new.taken_from', this.request_new.taken_from);
    console.log('create -> request_new.taken_to', this.request_new.taken_to);
    console.log('create -> request_new.nature_of_sickness', this.request_new.nature_of_sickness);
    console.log('create -> request_new.is_self_certification', this.request_new.is_self_certification);
    this._myLeaveService.postStaffPortalLeaveRequest(
      {
        // leave_request_employee_id: '1222',
        // leave_request_employee_id: this.selectedEmployeeId,
        leave_request_absence_type_sap_id: this.request_new.absence_type_sap_id,
        leave_request_taken_from: this.request_new.taken_from,
        leave_request_taken_to: this.request_new.taken_to,
        leave_request_nature_of_sickness: this.request_new.nature_of_sickness,
        leave_request_is_self_certification: this.request_new.is_self_certification
      }
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
      console.log('create data', data);
      this.newRequest = data;
      this._toastr.info('Created', 'New Medical Leave', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.request_item.disable_save_button = false;
      this.request_item.show_model_loader = false;
      // this.requestCreated = true;
      this.sendForApproval();
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

  createMedicalLeave(event) {
    this.request_new.absence_type_sap_id = '9001';
    this.request_item.disable_save_button = true;
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;
    this.fileList = [];
    console.log('create -> request_new.absence_type_sap_id', this.request_new.absence_type_sap_id);
    console.log('create -> request_new.taken_from', this.request_new.taken_from);
    console.log('create -> request_new.taken_to', this.request_new.taken_to);
    console.log('create -> myEmployeeId', this.request.logged_in_profile.employee_id);
    console.log('create -> request_new.include_doctor_consultation', this.request_new.include_doctor_consultation);
    console.log('create -> request_new.nature_of_sickness', this.request_new.nature_of_sickness);
    console.log('create -> request_new.is_self_certification', this.request_new.is_self_certification);

    this.fileList.push(...event.addedFiles);
    const formData = new FormData();
    for (var i = 0; i < this.fileList.length; i++) {
      formData.append('leave_request_uploaded_document', this.fileList[i],);
    }
    this._myLeaveService.postStaffPortalNewMedicalLeaveRequest(
      this.request_new.absence_type_sap_id, this.request_new.taken_from, this.request_new.taken_to,
      this.request.logged_in_profile.employee_id, this.request_new.include_doctor_consultation,
      this.request_new.nature_of_sickness, formData).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('createMedicalLeave -> data', data);
        this.newRequest = data;
        this.fileList = [];
        this._toastr.info('Created: ', 'Medical Certificate Uploaded Successfully', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
        this.request_item.disable_save_button = false;
        this.request_item.show_model_loader = false;
        this.sendForApproval();
        // this.requestCreated = true;
      }, (error: Response | any) => {
        console.log('createMedicalLeave -> error', error);
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

  removeDocument(event) {
    console.log(event);
    this.fileList.splice(this.fileList.indexOf(event), 1);
  }

  saveHandover() {
    this.request_new.absence_type_sap_id = '9001';
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;
    this._myLeaveService.postStaffPortalLeaveWorkhandoverRequest(
      {
        leave_request_id: this.newRequest.leave_request_id,
        responsibilities: this.responsibilities,
        work_handover_employee_id: this.workhandoverEmployeeId,
      }
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
      console.log('requestList data', data);
      this._toastr.info('Created', 'New Handover', { closeButton: true, timeOut: 3000, progressBar: true, enableHtml: true });
      this.request_item.disable_save_button = false;
      this.request_item.show_model_loader = false;
      this.requestAddWorkhandOver = true;
    }, (error: Response | any) => {
      console.log('saveHandover -> error', error);
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

  skipHandover() {
    this.request_new.absence_type_sap_id = '9001';
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;
    this.request_item.disable_save_button = false;
    this.request_item.show_model_loader = false;
    this.requestAddWorkhandOver = true;
  }

  sendForApproval() {
    this.request_new.absence_type_sap_id = '9001';
    this.request_item.disable_save_button = true;
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;

    this._myLeaveService.postStaffPortalLeaveRequestSendForApproval(this.newRequest.leave_request_id)
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('create data', data);
        setTimeout(() => {
          // Closing model with timeout
          this.closeModel();
        }, this.modelCloseTimeOut);
        this._toastr.success('Leave Request', 'Request send for supervisor Approval', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
        this.request_item.disable_save_button = false;
        this.request_item.show_model_loader = false;
        this.requestCreated = true;
        this.requestSendForApproval = true;
        this.request_new.absence_type_sap_id = '9001';
      }, (error: Response | any) => {
        console.log('getMyLeaveRequestForPageOneOnly -> error', error);
        if (error) {
          this._coreErrorHandler.handleError(error).then((apiError: any) => {
            this.request_item.general_api_error = apiError.general_api_error;
            this.request_item.model_state_error = apiError.model_state_error;
          });
        }
        this.request_item.disable_save_button = false;
        this.request_item.show_model_loader = false;
        return throwError(new Error(error.status));
      });
  }


  skipSendForApproval() {
    this.request_item.show_model_loader = true;
    this.request_new.absence_type_sap_id = '9001';
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = false;
    setTimeout(() => {
      this.closeModel();
    }, this.modelCloseTimeOut);
  }

  // Clear Error Message on Text On change
  onChangeEventForMedical(event: any) {
    // this.getLeaveQuotaFromSap();
    console.log('onChangeEventForMedical 400', event);
    console.log('onChangeEventForMedical ->', this.selectMedicalLeaveType);
    this.resetApiErrorModal('');
    this.request_item.disable_save_button = false;
  }

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    this.resetApiErrorModal('');
    this.request_item.disable_save_button = false;
  }

  closeModel() {
    // this.visible = !this.visible;
    this.fileList = [];
    this.request_new.absence_type_sap_id = '';
    this.request_new.taken_from = '';
    this.request_new.taken_to = '';
    this.newRequest.leave_request_id = '';
    this.responsibilities = '';
    this.workhandoverEmployeeId = '';

    this.resetApiErrorModal('');
    this.request_item.disable_save_button = false;

    this.requestCreated = false;
    this.requestAddWorkhandOver = false;
    this.requestSendForApproval = false;
    this.closeThisModel.emit(null);
  }

  getLeaveQuotaFromSap() {
    this._myLeaveService.getStaffPortalAbsenceQuotaFromSap(this.request.logged_in_profile, this.request.current_year)
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getLeaveQuotaFromSap data', data);
        this.request.leave_quota = data.items;
        this.request_item.show_model_loader = false;
      }, (error: Response | any) => {
        console.log('getLeaveQuotaFromSap -> error', error);
        this.request_item.show_model_loader = false;
        return throwError(new Error(error.status));
      });
  }

  resetApiErrorModal(functionName) {
    this.request_item.model_state_error = [];
    this.request_item.general_api_error = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> model_state_error - ', this.request_item.model_state_error);
    console.log(functionName, ' -> general_api_error - ', this.request_item.general_api_error);
  }
}
