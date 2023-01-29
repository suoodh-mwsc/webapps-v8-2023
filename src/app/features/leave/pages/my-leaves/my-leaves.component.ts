import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import * as moment from 'moment';
declare var $: any;
// Env
import { environment } from '../../../../../environments/environment';
// Ui Config
import { UiConfigService } from '../../../../core/services/ui-config/ui-config.service';
// API Data Services
import { MyLeaveService } from '../../../../shared/services/leave/my-leave.service';
// Core Services
import { PaginationService } from '../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from '../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
})
export class MyLeavesComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Leave Requests', page_title_simple: 'leave request' }
  // API Data
  request: any = { items: [], pagination: [], total_pages: 0, leave_quota: [], new_request: [], current_year: null, logged_in_profile: [], api_update_available: false, model_state_error: [], general_api_error: '' };
  // API Data - UI Realted
  requestUi: any = { viewType: 'card', show_loader: true, loader_size: 'xl' };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.staffPortal.leaveRequests.defaultMaxPaginations;
  // Filter
  filter: any = {
    show_filters: false, show_filter_loader: false, 'default_page_size': null,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    searchText: '', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(
    private _uiConfigService: UiConfigService,
    private _myLeaveService: MyLeaveService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-leave');
    this.requestUi.viewType = viewtype;

    this.getRequestForPageOneOnly(1);
    this.request.logged_in_profile = JSON.parse(localStorage.getItem('myProfile'));
    this.request.current_year = moment().format('YYYY');


    this.filter.supervisor_approval_status_list = [
      { Id: '', Name: '--', Label: '-- none --' },
      { Id: 1, Name: 'true', Label: 'Approved' },
      { Id: 2, Name: 'false', Label: 'Pending' },
    ];
    this.filter.supervisor_approval_status = this.filter.supervisor_approval_status_list[0].Name;


    this.filter.leave_type_list = [
      { Id: '', Name: '-- Leave Type --' },
      { Id: 9000, Name: 'Annual' },
      { Id: 9001, Name: 'Medical' },
      { Id: 9004, Name: 'Compassionate' },
      { Id: 9002, Name: 'Maternity' },
      { Id: 9003, Name: 'Paternity' },
      { Id: 9005, Name: 'Circumcision' },
    ];
    this.filter.leave_type = this.filter.leave_type_list[0].Id;


    // this.leaveTypeList = [{ Id: 9000, Description: '' }]
  }

  ngOnInit() {
    this.getLeaveQuotaFromSap(null);
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  // First Page Data from Server
  getRequestForPageOneOnly(pageNo) {
    this.requestUi.show_loader = true;
    this.request.items = [];
    this._myLeaveService.getStaffPortalLeaveRequestsWithPaginationFilter
      (pageNo, this.defaultPaginationSize, this.filter.searchText,
        this.filter.leave_type, this.filter.supervisor_approval_status, this.filter.year)
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('requestList data', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        if (data.total_pages > 0) {
          this._corePaginationService.generateAllPages(this.defaultPaginationSize, data).then((listPagination: any) => {
            this.request.items = listPagination.items;
            this.request.pagination = listPagination;
            this.request.total_pages = listPagination.total_pages;
          });
        }
        this.requestUi.show_loader = false;
      }, (error: Response | any) => {
        if (error) {
          this._coreErrorHandler.handleError(error).then((apiError: any) => {
            this.request.general_api_error = apiError.general_api_error;
            this.request.model_state_error = apiError.model_state_error;
          });
        }
        this.requestUi.show_loader = false;
        return throwError(new Error(error.status));
      });
  }


  // Page Data by PageNo from Server
  getRequestFromPagination(pageNo) {
    this.requestUi.show_loader = true;
    this.request.items = [];
    this._myLeaveService.getStaffPortalLeaveRequestsWithPaginationFilter
      (pageNo, this.defaultPaginationSize, this.filter.searchText, this.filter.leave_type,
        this.filter.supervisor_approval_status, this.filter.year)
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        this.requestUi.show_loader = true;
        if (data.total_pages) {
          this._corePaginationService.getPageFromPaginationNo(pageNo, data).then((listPagination: any) => {
            this.request.items = listPagination.items;
            this.request.pagination = listPagination;
            this.request.total_pages = listPagination.total_pages;
          });
        }
        this.requestUi.show_loader = false;
      }, (error: Response | any) => {
        if (error) {
          this._coreErrorHandler.handleError(error).then((apiError: any) => {
            this.request.general_api_error = apiError.general_api_error;
            this.request.model_state_error = apiError.model_state_error;
          });
        }
        this.requestUi.show_loader = false;
        return throwError(new Error(error.status));
      });
  }


  // Pagination goto Previous Page - First Page Check
  getRequestFromPaginationPrv(currentPage) {
    console.log('getRequestFromPaginationPrv', currentPage);
    if (currentPage === 1) {
      console.log('Current Page is First Page');
    } else {
      this.getRequestFromPagination(currentPage - 1);
    }
  }

  // Pagination goto Next Page - Last Page Check
  getRequestFromPaginationNext(currentPage) {
    console.log('getRequestFromPaginationNext', currentPage);
    if (currentPage === this.request.pagination.total_pages) {
      console.log('Current Page is Last Page');
    } else {
      this.getRequestFromPagination(currentPage + 1);
    }
  }

  // Pagination goto First Page - First Page Check
  getRequestFromPaginationFirst(currentPage) {
    console.log('getRequestFromPaginationFirst', currentPage);
    if (currentPage === 1) {
      this.getRequestFromPagination(currentPage);
    }
  }

  // Pagination goto Last Page - Last Page Check
  getRequestFromPaginationLast(currentPage) {
    console.log('getRequestFromPaginationLast', currentPage);
    if (currentPage === this.request.pagination.total_pages) {
      this.getRequestFromPagination(currentPage);
    }
  }


  hideViewCreateLeaveModal() {
    $('#ViewCreateLeaveModal').modal('hide');
    if (this.request.api_update_available === true) {
      console.log('requestToRefresh -> Changes Available');
      this.refreshApiData();
    } else {
      console.log('requestToRefresh -> Changes Not Available');
    }
    this.getRequestForPageOneOnly(1);
    // console.log('generateAllPages', this.apiDataService);
  }

  showViewCreateLeaveModal() {
    $('#ViewCreateLeaveModal').modal('show');
  }


  hideViewMedicalCreateLeaveModal() {
    $('#ViewMedicalCreateLeaveModal').modal('hide');
    this.getRequestForPageOneOnly(1);
    // console.log('generateAllPages', this.apiDataService);
  }

  showViewMedicalCreateLeaveModal() {
    $('#ViewMedicalCreateLeaveModal').modal('show');
  }


  hideViewSwitchProfileModel() {
    $('#ViewSwitchProfileModel').modal('hide');
  }

  showViewSwitchProfileModel() {
    $('#ViewSwitchProfileModel').modal('show');
  }

  createLeave() {
    // this.requestUi.show_loader = true;
    this._myLeaveService.postStaffPortalLeaveRequest(
      {
        leave_request_absence_type_sap_id: this.request.new_request.leave_request_absence_type_sap_id,
        leave_request_taken_from: this.request.new_request.leave_request_taken_from,
        leave_request_taken_to: this.request.new_request.leave_request_taken_to,
        leave_request_additional_details: this.request.new_request.leave_request_additional_details,
        leave_request_nature_of_sickness: this.request.new_request.leave_request_nature_of_sickness,
        leave_request_is_self_certification: this.request.new_request.leave_request_is_self_certification
      }
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
      console.log('requestList data', data);
      this.request = data.items;
      this.requestUi.show_loader = false;
    }, (error: Response | any) => {
      console.log('getRequestForPageOneOnly -> error', error);
      this.requestUi.show_loader = false;
      return throwError(new Error(error.status));
    });
  }


  getLeaveQuotaFromSap(event) {
    if (event != null) {
      console.log("getLeaveQuotaFromSap empId=====>", event.empId);
      console.log("getLeaveQuotaFromSap year=====>", event.year);
      this.request.logged_in_profile.employee_id = event.empId
      this.request.current_year = event.year
    }
    this._myLeaveService.getStaffPortalAbsenceQuotaFromSap
      (this.request.logged_in_profile.employee_id, this.request.current_year)
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getLeaveQuotaFromSap data', data);
        this.request.leave_quota = data.items;
        this.requestUi.show_loader = false;
      }, (error: Response | any) => {
        console.log('getLeaveQuotaFromSap -> error', error);
        this.requestUi.show_loader = false;
        return throwError(new Error(error.status));
      });
  }


  showHideFilters(event: any) {
    console.log(event);
    if (event === true) {
      this.filter.show_filters = true;
    }
    if (event === false) {
      this.filter.show_filters = false;
    }
  }

  changeView(event) {
    console.log('changeView', event);
    this._uiConfigService.setUiConfigDataFromStorage('ui-view-leave', event)
    this.requestUi.viewType = event;
  }

  refreshApiData() {
    this.requestUi.show_loader = true;
    this.request.items = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestForPageOneOnly(1);
  }
}
