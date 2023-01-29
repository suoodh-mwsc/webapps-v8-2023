import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
// API Data Services
import { TppaPaymentsService } from './../../../../../shared/services/finance/tppa-payments.service';
// Core Services
import { PaginationService } from './../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-tppa-payments-common-view',
  templateUrl: './tppa-payments-common-view.component.html',
  styleUrls: ['./tppa-payments-common-view.component.scss']
})
export class TppaPaymentsCommonViewComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.staffPortal.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.staffPortal.common.modelCloseTimeOut;
  // Wizard
  tabUi: any = {
    selectedTab: 'requestDetails',
    showRequestAttachment: true,
    disableRequestDetails: true, disableRequestHandover: false, disableRequestHistory: true, disableRequestAttachment: false
  };
  // Parent Component Data
  @Input() request_item: any;
  // Model Close 
  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();


  constructor(
    private toastr: ToastrService,
    private _tppaPayments: TppaPaymentsService) {

  }


  ngOnInit() {
    this.resetApiErrorModal('');
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
    } else if (step === 'requestHistory') {
      this.tabUi.selectedTab = step;
      this.tabUi.disableRequestDetails = false;
      this.tabUi.disableRequestHandover = false;
      this.tabUi.disableRequestHistory = true;
      this.tabUi.disableRequestAttachment = false;
    }
  }


  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    this.resetApiErrorModal('');
  }


  closeModel() {
    this.resetApiErrorModal('');
    this.request_item.data = [];
    // this.visible = !this.visible;
    this.closeThisModel.emit(null);
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
