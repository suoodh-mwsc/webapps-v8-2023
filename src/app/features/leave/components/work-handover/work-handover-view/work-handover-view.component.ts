import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ViewChild, ElementRef, Input, Output, EventEmitter
} from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import * as moment from 'moment';
declare var $: any;
import { environment } from '../../../../../../environments/environment';
// Models
import { WorkHandoverActionModelComponent } from '../work-handover-action-model/work-handover-action-model.component';
// API Data Services
// import { StaffPortalLeaveBaseService } from '../../../../services/staff-portal-leave-base.service';
import { MyLeaveService } from '../../../../../shared/services/leave/my-leave.service';
// Core Services
import { PaginationService } from '../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from '../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-work-handover-view',
  templateUrl: './work-handover-view.component.html',
})
export class WorkHandoverViewComponent implements OnInit, OnDestroy, AfterViewInit {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Buttons
  uiButton: any = environment.appConfig.staffPortal.workHandoverRequests.buttons;
  // API - View Component Data
  request_item: any = { data: [], history: [], work_handover: [], show_model_loader: 0, api_update_available: false, model_state_error: [], general_api_error: '' };
  // Parent Component Data
  @Input() request: any;
  @Input() requestUi: any;
  // Modal - Call Parent Function
  @ViewChild('ViewModalBackdrop', { static: false }) ViewModalBackdrop: ElementRef;
  @ViewChild('ViewActionModal', { static: false }) ViewActionModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  @ViewChild(WorkHandoverActionModelComponent, { static: false }) WorkHandoverActionModelComponent: WorkHandoverActionModelComponent;

  constructor(
    private _myLeaveService: MyLeaveService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngAfterViewInit() {
    this.WorkHandoverActionModelComponent.resetApiErrorModal('fromParent');
    this.WorkHandoverActionModelComponent.resetSelectedActionModal('fromParent');
  }

  // First Page Data from Server
  getRequestHistory(leaveId) {
    this.resetApiErrorModal('');
    this.request_item.history = [];
    console.log('getMyselectedleaveHistory data', leaveId);
    this.request_item.show_model_loader = true;
    this.request_item.show_model_loader = true;
    this._myLeaveService.getStaffPortalLeaveRequestsHistoryById(leaveId)
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getMyselectedleaveHistory data', data);
        this.request_item.history = data.items;
        this.request_item.show_model_loader = false;
        this.request_item.show_model_loader = false;
      }, (error: Response | any) => {
        console.log('getMyselectedleaveHistory -> error', error);
        this.request_item.show_model_loader = false;
        this.request_item.show_model_loader = false;
        return throwError(new Error(error.status));
      });
  }


  hideViewActionModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    // $('#ViewActionModal').modal('hide');
    this.ViewModalBackdrop.nativeElement.className = '';
    this.ViewActionModal.nativeElement.className = '';
    this.ViewActionModal.nativeElement.style = 'display: none;';
  }

  showViewActionModal(leaveRequest) {
    this.resetApiErrorModal('');
    this.request_item.data = leaveRequest;
    this.getRequestHistory(leaveRequest.leave_request_id)

    console.log('ViewActionModal -> selectedleaveData', this.request_item.data);
    console.log('ViewActionModal ->      selectedleaveHistory', this.request_item.history);
    // $('#ViewActionModal').modal('show');
    this.ViewModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.ViewActionModal.nativeElement.className = 'modal fade show';
    this.ViewActionModal.nativeElement.style = 'display: block;';
  }



  resetApiErrorModal(functionName) {
    this.ngAfterViewInit();
    this.request_item.model_state_error = [];
    this.request_item.general_api_error = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> request_item.model_state_error - ', this.request_item.model_state_error);
    console.log(functionName, ' -> request_item.general_api_error - ', this.request_item.general_api_error);
  }

  // Request Refresh API Data
  public requestToRefresh(functionName) {
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
