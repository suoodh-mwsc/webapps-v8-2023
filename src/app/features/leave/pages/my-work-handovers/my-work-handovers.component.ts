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
  selector: 'app-my-work-handovers',
  templateUrl: './my-work-handovers.component.html',
})
export class MyWorkHandoversComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Work Handovers', page_title_simple: 'work handovers' }
  // API Data
  request: any = { items: [], pagination: [], total_pages: 0, model_state_error: [], general_api_error: '' };
  // API Data - UI Realted
  requestUi: any = { viewType: 'card', show_loader: true, loader_size: 'xl', show_avatar: false };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.staffPortal.leaveRequests.defaultMaxPaginations;
  // Filter
  filter: any = {
    show_filters: false, show_filter_loader: false, 'default_page_size': null,
    disable_leave_type: false,
    disable_search_text: false,
    disable_filter_year: false,
    disable_filter_supervisor_approval_status: false,
    searchText: '', year: '',
    leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };

  // Quota
  myProfile: any;
  myEmployeeId: any;
  thisYear: any;
  myLeaveQuota: any;
  // Create New
  newRequest: any = [];
  // Quota
  leaveTypeList: any;

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(
    private _uiConfigService: UiConfigService,
    private _myLeaveService: MyLeaveService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-handover');
    this.requestUi.viewType = viewtype;
    let show_avatar = this._uiConfigService.getUiAvatarConfigDataFromStorage('ui-view-handover');
    this.requestUi.show_avatar = show_avatar;

    this.getRequestForPageOneOnly(1);
    this.myProfile = JSON.parse(localStorage.getItem('myProfile'));
    console.log('Profile ', this.myProfile);
    this.myEmployeeId = this.myProfile.employee_id;
    this.thisYear = moment().format('YYYY');

    this.leaveTypeList = [{ Id: 9000, Description: '' }]
  }

  ngOnInit() {
    this.getLeaveQuotaFromSap();
    localStorage.removeItem('requestWithPagination');
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
    this._myLeaveService.getStaffPortalWorkHandoverWithPaginationFilter(pageNo, this.defaultPaginationSize)
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
    this._myLeaveService.getStaffPortalWorkHandoverWithPaginationFilter(pageNo, this.defaultPaginationSize)
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
    this.getRequestForPageOneOnly(1);
    // console.log('generateAllPages', this.apiDataService);
  }

  showViewCreateLeaveModal() {
    $('#ViewCreateLeaveModal').modal('show');
  }


  getLeaveQuotaFromSap() {
    this._myLeaveService.getStaffPortalAbsenceQuotaFromSap(this.myEmployeeId, this.thisYear)
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getLeaveQuotaFromSap data', data);
        this.myLeaveQuota = data.items;
        // this.requestList = data.items;
        // this.requestListWithPagination = data;
        this.requestUi.show_loader = false;
      }, (error: Response | any) => {
        console.log('getLeaveQuotaFromSap -> error', error);
        this.requestUi.show_loader = false;
        return throwError(new Error(error.status));
      });
  }

  changeView(event) {
    console.log('changeView', event);
    this._uiConfigService.setUiConfigDataFromStorage('ui-view-handover', event)
    this.requestUi.viewType = event;
  }

  refreshApiData() {
    this.requestUi.show_loader = true;
    this.request.items = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestForPageOneOnly(1);
  }
}
