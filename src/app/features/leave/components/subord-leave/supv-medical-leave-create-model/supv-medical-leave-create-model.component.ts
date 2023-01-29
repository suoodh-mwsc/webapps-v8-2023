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
import { PaginationService } from '../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from '../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-supv-medical-leave-create-model',
  templateUrl: './supv-medical-leave-create-model.component.html',
})
export class SupvMedicalLeaveCreateModelComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.supervisorPortal.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.supervisorPortal.common.modelCloseTimeOut;

  selectSelfCerification: boolean = true;
  selectMedicalLeaveType: any;
  // Create New
  absenceTypeSapId: any = '9001';
  takenFrom: any;
  takenTo: any;
  includeDoctorsConsultation: boolean = true;
  natureOfSickness: any;
  isSelfCertification: any;
  // Upload
  fileList: File[] = [];
  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  model_state_error: any;
  general_api_error: any;
  // Parent Component Data
  @Input() selectedEmployeeId: any;
  @Input() selectedEmployee: any;
  @Input() myLeaveQuota: any;
  @Input() newRequest: any;
  @Input() showLoader: boolean = false;

  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private _subordinateLeaveService: SubordinateLeaveService,
    private _toastr: ToastrService) {
  }

  ngOnInit() {
    console.log('ngOnInit this.myLeaveQuota', this.myLeaveQuota);
    console.log('ngOnInit this.myLeaveQuota', this.myLeaveQuota);

    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }

  setSelfCerification(check) {
    console.log('setSelfCerification', check);
    if (check === 'Self Certification') {
      this.includeDoctorsConsultation = false;
    } else if (check === 'Medical Certificate') {
      this.includeDoctorsConsultation = true;
    }
  }

  createLeave() {
    this.disableSaveButton = true;
    this.general_api_error = null;
    this.model_state_error = null;
    this.showModelLoader = true;
    if (this.selectMedicalLeaveType === 'Self Certification'){
      this.isSelfCertification = true;
    }
    // this.absenceTypeSapId = this.selectMedicalLeaveType;

    console.log('create -> selectMedicalLeaveType', this.selectMedicalLeaveType);
    console.log('create -> selectedEmployeeId', this.selectedEmployeeId);
    console.log('create -> absenceTypeSapId', this.absenceTypeSapId);
    console.log('create -> takenFrom', this.takenFrom);
    console.log('create -> takenTo', this.takenTo);
    console.log('create -> natureOfSickness', this.natureOfSickness);
    console.log('create -> isSelfCertification', this.isSelfCertification);

    this._subordinateLeaveService.postStaffPortalLeaveRequest(
      {
        leave_request_employee_id: this.selectedEmployeeId,
        leave_request_absence_type_sap_id: this.absenceTypeSapId,
        leave_request_taken_from: this.takenFrom,
        leave_request_taken_to: this.takenTo,
        leave_request_nature_of_sickness: this.natureOfSickness,
        leave_request_is_self_certification: this.isSelfCertification
      }
    ).subscribe((data: any) => {
      console.log('create data', data);
      setTimeout(() => {
        // Closing model with timeout
        this.closeModel();
      }, this.modelCloseTimeOut);
      this._toastr.success('Created', 'New Medical Leave', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.disableSaveButton = false;
      this.showModelLoader = false;
    }, (error: Response | any) => {
      console.log('getMyLeaveRequestForPageOneOnly -> error', error);
      if (error.status === 400) {
        this.general_api_error = error.error.error_message;
        this.model_state_error = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.general_api_error = 'oh snap! unknown error occurred';
      } else {
        this.general_api_error = error.error.error_message;
      }
      this.disableSaveButton = true;
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }

  createMedicalLeave(event) {
    this.general_api_error = null;
    this.model_state_error = null;
    this.showModelLoader = true;
    this.fileList = [];
    console.log('create -> selectMedicalLeaveType', this.selectMedicalLeaveType);
    console.log('create -> selectedEmployeeId', this.selectedEmployeeId);
    console.log('create -> absenceTypeSapId', this.absenceTypeSapId);
    console.log('create -> takenFrom', this.takenFrom);
    console.log('create -> takenTo', this.takenTo);
    console.log('create -> includeDoctorsConsultation', this.includeDoctorsConsultation);
    console.log('create -> natureOfSickness', this.natureOfSickness);
    console.log('create -> isSelfCertification', this.isSelfCertification);

    this.fileList.push(...event.addedFiles);
    const formData = new FormData();
    for (var i = 0; i < this.fileList.length; i++) {
      formData.append('leave_request_uploaded_document', this.fileList[i],);
    }
    this._subordinateLeaveService.postStaffPortalNewMedicalLeaveRequest(this.absenceTypeSapId, this.takenFrom, this.takenTo, this.includeDoctorsConsultation, this.natureOfSickness, this.selectedEmployeeId, formData).subscribe((data: any) => {
      console.log('createMedicalLeave -> data', data);
      this.fileList = [];
      setTimeout(() => {
        // Closing model with timeout
        this.closeModel();
      }, this.modelCloseTimeOut);
      this._toastr.success('Upload Complete: ', 'Medical Certificate Uploaded Successfully', { closeButton: true, timeOut:  this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.showModelLoader = false;
    }, (error: Response | any) => {
      console.log('createMedicalLeave -> error', error);
      if (error.status === 400) {
        this.general_api_error = error.error.error_message;
        this.model_state_error = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 0 || error.status === 400 || error.status === 400) {
        this.general_api_error = 'Oh Snap! Unknown error Occurred';
      } else {
        this.general_api_error = error.error.error_message;
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }

  
  removeDocument(event) {
    console.log(event);
    this.fileList.splice(this.fileList.indexOf(event), 1);
  }

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    console.log('onChangeEvent 400', event);
    console.log('onChangeEvent ->', this.selectMedicalLeaveType);
    this.model_state_error = null;
    this.general_api_error = null;
    this.disableSaveButton = false;
  }

  closeModel() {
    // this.visible = !this.visible;
    this.closeThisModel.emit(null);
  }
}
