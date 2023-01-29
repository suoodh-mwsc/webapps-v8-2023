import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
declare var $: any;
import { environment } from '../../../../../../environments/environment';
// API Data Services
// import { StaffPortalLeaveBaseService } from '../../../../services/staff-portal-leave-base.service';
import { MyLeaveService } from '../../../../../shared/services/leave/my-leave.service';
// Core Services
import { PaginationService } from '../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from '../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-work-handover-details-common-view',
  templateUrl: './work-handover-details-common-view.component.html',
})
export class WorkHandoverDetailsCommonViewComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Wizard
  tabUi: any = {
    selectedTab: 'requestDetails',
    showRequestAttachment: true, disableRequestDetails: true, disableRequestHistory: false,
  };
  // Parent Component Data
  @Input() request_item: any;
  // Model close
  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private _myLeaveService: MyLeaveService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
  }

  ngOnInit() {
    this.request_item.general_api_error = null;
    this.request_item.model_state_error = [];

    setTimeout(() => {
      $('#apiRequest-info-alert').alert('close');
      // console.log('apiRequest-info-alert');
    }, 1000);

    setTimeout(() => {
      $('#approveRequest-info-alert').alert('close');
      // console.log('approveRequest-info-alert');
    }, 1000);

    setTimeout(() => {
      $('#notApproveRequest-info-alert').alert('close');
      // console.log('notApproveRequest-info-alert');
    }, 1000);
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  selectTab(step) {
    console.log('selectTab -> step ', step);
    // this.innermodel_state_error = null;
    // this.innerModelgeneral_api_error = null;
    if (step === 'requestDetails') {
      this.tabUi.selectedTab = step;
      this.tabUi.disableRequestDetails = true;
      this.tabUi.disableRequestHistory = false;
    } else if (step === 'requestHistory') {
      this.tabUi.selectedTab = step;
      this.tabUi.disableRequestDetails = false;
      this.tabUi.disableRequestHistory = true;
    }
  }

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    this.request_item.model_state_error = [];
    this.request_item.general_api_error = null;
  }

  closeModel() {
    // this.visible = !this.visible;
    this.closeThisModel.emit(null);
  }
}
