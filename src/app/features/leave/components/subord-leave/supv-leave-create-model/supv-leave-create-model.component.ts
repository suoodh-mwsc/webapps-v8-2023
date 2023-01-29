import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
// Env
import { environment } from '../../../../../../environments/environment';
// API Data Services
import { SubordinateLeaveService } from '../../../../../shared/services/leave/subordinate-leave.service';
// Core Services
import { YodaCoreErrorHandlerService } from '../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-supv-leave-create-model',
  templateUrl: './supv-leave-create-model.component.html',
})
export class SupvLeaveCreateModelComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.supervisorPortal.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.supervisorPortal.common.modelCloseTimeOut;

  selectLeaveType: any;
  // Create New
  absenceTypeSapId: any;
  takenFrom: any;
  takenTo: any;
  additionalDetails: any;
  natureOfSickness: any;
  isSelfCertification: any;
  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  model_state_error: any;
  general_api_error: any;
  // Parent Component Data
  @Input() selectedEmployee: any;
  @Input() selectedEmployeeId: any;
  @Input() myLeaveQuota: any;
  @Input() newRequest: any;
  @Input() showLoader: boolean = false;

  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private _toastr: ToastrService,
    private _subordinateLeaveService: SubordinateLeaveService) {
  }

  ngOnInit() {
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 400);
  }


  create() {
    this.disableSaveButton = true;
    this.general_api_error = null;
    this.model_state_error = null;
    this.showModelLoader = true;
    console.log('create -> selectLeaveType', this.selectLeaveType);
    this.absenceTypeSapId = this.selectLeaveType;
    console.log('create -> absenceTypeSapId', this.absenceTypeSapId);
    console.log('create -> takenFrom', this.takenFrom);
    console.log('create -> takenTo', this.takenTo);
    console.log('create -> additionalDetails', this.additionalDetails);
    console.log('create -> natureOfSickness', this.natureOfSickness);
    console.log('create -> isSelfCertification', this.isSelfCertification);
    this._subordinateLeaveService.postStaffPortalLeaveRequest(
      {
        leave_request_employee_id: this.selectedEmployeeId,
        leave_request_absence_type_sap_id: this.absenceTypeSapId,
        leave_request_taken_from: this.takenFrom,
        leave_request_taken_to: this.takenTo,
        leave_request_additional_details: this.additionalDetails,
        // leave_request_nature_of_sickness: this.natureOfSickness,
        // leave_request_is_self_certification: this.isSelfCertification
      }
    ).subscribe((data: any) => {
      console.log('requestList data', data);
      setTimeout(() => {
        // Closing model with timeout
        this.closeModel();
      }, 2000);
      this._toastr.success('Created', 'New Leave', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true  });
      this.disableSaveButton = false;
      this.showModelLoader = false;
    }, (error: Response | any) => {
      console.log('getMyLeaveRequestForPageOneOnly -> error', error);
      if (error.status === 400) {
        this.general_api_error = error.error.error_message;
        this.model_state_error = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 0 || error.status === 400 || error.status === 400) {
        this.general_api_error = 'oh snap! unknown error occurred';
      } else {
        this.general_api_error = error.error.error_message;
      }
      this.disableSaveButton = true;
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    console.log('onChangeEvent 400', event);
    console.log('onChangeEvent ->', this.selectLeaveType);
    this.model_state_error = null;
    this.general_api_error = null;
    this.disableSaveButton = false;
  }

  closeModel() {
    // this.visible = !this.visible;
    this.closeThisModel.emit(null);
  }
}
