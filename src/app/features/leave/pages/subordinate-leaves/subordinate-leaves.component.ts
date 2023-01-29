import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import { CookieService } from 'ngx-cookie-service';
// Env
import { environment } from '../../../../../environments/environment';
// Ui Config
import { UiConfigService } from '../../../../core/services/ui-config/ui-config.service';
// Storage
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';
// API Data Services
import { SubordinateLeaveService } from '../../../../shared/services/leave/subordinate-leave.service';
import { MySubordinatesService } from '../../../../shared/services/general/my-subordinates.service';
// Core Services
import { PaginationService } from '../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from '../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-subordinate-leaves',
  templateUrl: './subordinate-leaves.component.html',
})
export class SubordinateLeavesComponent implements OnInit {

  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Leave Requests', page_title_simple: 'leave request' }
  // API Data
  request: any = { items: [], pagination: [], total_pages: 0, leave_quota: [], new_request: [], current_year: null, logged_in_profile: [], api_update_available: false, model_state_error: [], general_api_error: '' };
  // API Data - UI Realted
  requestUi: any = { view_type: 'card', show_loader: true, loader_size: 'xl' };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.staffPortal.leaveRequests.defaultMaxPaginations;
  // Filter
  filter: any = {
    show_filters: false, show_filter_loader: false, 'default_page_size': null,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    searchText: '', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };
  // Quota
  thisYear: any;
  // Create New
  newRequest: any = [];
  // selected Employee
  myProfile: any;
  // selected Employee
  selectedEmployeeId: any;
  selectedEmployee: any;
  subordinateAvatorFilters: any = [];

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(
    private _uiConfigService: UiConfigService,
    private _localStorageService: LocalStorageService,
    private _subordinateLeaveService: SubordinateLeaveService,
    private _mySubordinatesService: MySubordinatesService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-supv-leave');
    this.requestUi.viewType = viewtype;

    // this.selectedEmployeeId = this.activatedRoute.snapshot.paramMap.get('employeeId');
    this.request.logged_in_profile = JSON.parse(localStorage.getItem('myProfile'));
    this.request.current_year = moment().format('YYYY');

    this._mySubordinatesService.getSupvPortalSubordinateFilter(this.request.logged_in_profile.employee_id).subscribe((data: any) => {
      console.log('getSubordinates -> data', data);
      // localStorage.setItem('subordinateList', JSON.stringify(data));
      this._localStorageService.setLocalStorage('subordinatesList', JSON.stringify(data));

      this.subordinateAvatorFilters = data;
      // this.selectSubordinate(data[0], 'onLoad');
      this.selectedEmployee = (data[0]);
      this.selectedEmployeeId = (data[0].employee_id);
      if (this.selectedEmployeeId) {
        this.subordinateAvatorFilters.forEach((ele, index) => {
          console.log('selectSubordinate -> index', index);
          if (ele.employee_id === this.selectedEmployee.employee_id) {
            ele.employee_selected_employee_ui = true;
            ele.employee_show_on_filter_avatar_ui = false;
            ele.employee_show_on_model_ui = false;
          } else {
            if (index < 10) {
              ele.employee_selected_employee_ui = false;
              ele.employee_show_on_filter_avatar_ui = true;
              ele.employee_show_on_model_ui = false;
            } else {
              ele.employee_selected_employee_ui = false;
              ele.employee_show_on_filter_avatar_ui = false;
              ele.employee_show_on_model_ui = true;
            }
          }
        });
        this.getRequestForPageOneOnly(1);
        this.getLeaveQuotaFromSap();
      }
      this.requestUi.show_loader = false;
      console.log('subordinateAvatorFilters', this.subordinateAvatorFilters);


      console.log('selectedEmployeeId ', this.selectedEmployeeId);
    }, (error: Response | any) => {
      this.requestUi.show_loader = false;
      return throwError(new Error(error.status));
    });
  }


  ngOnInit() {
    localStorage.removeItem('requestWithPagination');
  }

  // First Page Data from Server
  getRequestForPageOneOnly(pageNo) {

    this.requestUi.show_loader = true;
    this.request.items = [];
    this._subordinateLeaveService.getStaffPortalLeaveRequestsWithPaginationFilter(pageNo, this.defaultPaginationSize, this.selectedEmployeeId).subscribe((data: any) => {
      console.log('request.items data', data);
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
      console.log('getRequestForPageOneOnly -> error', error);
      if (error) {
        this._coreErrorHandler.handleError(error).then((apiError: any) => {
          this.request.general_api_error = apiError.general_api_error;
          this.request.model_state_error = apiError.model_state_error;
        });
      }
      return throwError(new Error(error.status));
    });
  }


  // Page Data by PageNo from Server
  getRequestFromPagination(pageNo) {
    this.requestUi.show_loader = true;
    this.request.items = [];
    this._subordinateLeaveService.getStaffPortalLeaveRequestsWithPaginationFilter(pageNo, this.defaultPaginationSize, this.selectedEmployeeId).subscribe((data: any) => {
      if (data.total_pages) {
        this._corePaginationService.getPageFromPaginationNo(pageNo, data).then((listPagination: any) => {
          this.request.items = listPagination.items;
          this.request.pagination = listPagination;
          this.request.total_pages = listPagination.total_pages;
        });
      }
      this.requestUi.show_loader = false;
    }, (error: Response | any) => {
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
    // console.log('generateAllPages', this.apiDataService);
  }

  showViewCreateLeaveModal() {
    $('#ViewCreateLeaveModal').modal('show');
  }


  hideViewCreateMedicalLeaveModal() {
    $('#ViewCreateMedicalLeaveModal').modal('hide');
    // console.log('generateAllPages', this.apiDataService);
  }

  showViewCreateMedicalLeaveModal() {
    $('#ViewCreateMedicalLeaveModal').modal('show');
  }


  hideViewAvatorLeaveModal() {
    this.refreshApiData();
    $('#ViewAvatorLeaveModal').modal('hide');
  }

  showViewAvatorLeaveModal() {
    $('#ViewAvatorLeaveModal').modal('show');
  }

  createLeave() {
    this._subordinateLeaveService.postStaffPortalLeaveRequest(
      {
        leave_request_absence_type_sap_id: this.newRequest.leave_request_absence_type_sap_id,
        leave_request_taken_from: this.newRequest.leave_request_taken_from,
        leave_request_taken_to: this.newRequest.leave_request_taken_to,
        leave_request_additional_details: this.newRequest.leave_request_additional_details,
        leave_request_nature_of_sickness: this.newRequest.leave_request_nature_of_sickness,
        leave_request_is_self_certification: this.newRequest.leave_request_is_self_certification
      }
    ).subscribe((data: any) => {
      console.log('request.items data', data);
      this.request.items = data.items;
      this.request.itemsWithPagination = data;
      this.requestUi.show_loader = false;
    }, (error: Response | any) => {
      console.log('getRequestForPageOneOnly -> error', error);
      this.requestUi.show_loader = false;
      return throwError(new Error(error.status));
    });
  }

  getLeaveQuotaFromSap() {
    this._subordinateLeaveService.getStaffPortalAbsenceQuotaFromSap(this.selectedEmployeeId, this.thisYear).subscribe((data: any) => {
      console.log('getLeaveQuotaFromSap data', data);
      this.request.leave_quota = data.items;
      this.requestUi.show_loader = false;
    }, (error: Response | any) => {
      console.log('getLeaveQuotaFromSap -> error', error);
      this.requestUi.show_loader = false;
      return throwError(new Error(error.status));
    });
  }


  selectSubordinate(selectedSubordinateFromFilter, eventFrom) {
    console.log('selectSubordinate -> selectedSubordinateFromFilter', selectedSubordinateFromFilter);
    console.log('selectSubordinate -> eventFrom', eventFrom);
    this.selectedEmployee = selectedSubordinateFromFilter;
    this.selectedEmployeeId = selectedSubordinateFromFilter.employee_id;

    let index = this.subordinateAvatorFilters.indexOf(selectedSubordinateFromFilter);

    this.subordinateAvatorFilters.forEach((ele, index) => {
      console.log('selectSubordinate -> index', index);
      if (ele.employee_id === selectedSubordinateFromFilter.employee_id) {
        ele.employee_selected_employee_ui = true;
        ele.employee_show_on_filter_avatar_ui = false;
        ele.employee_show_on_model_ui = false;
      } else {
        if (index < 10) {
          ele.employee_selected_employee_ui = false;
          ele.employee_show_on_filter_avatar_ui = true;
          ele.employee_show_on_model_ui = false;
        } else {
          ele.employee_selected_employee_ui = false;
          ele.employee_show_on_filter_avatar_ui = false;
          ele.employee_show_on_model_ui = true;
        }
      }
    });

    if (eventFrom === 'fromModel') {
      this.hideViewAvatorLeaveModal();
    }
    this.getRequestForPageOneOnly(1);
    this.getLeaveQuotaFromSap();
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
    this._uiConfigService.setUiConfigDataFromStorage('ui-view-pending-leave', event)
    this.requestUi.viewType = event;
  }

  refreshApiData() {
    this.requestUi.show_loader = true;
    this.request.items = [];
    this.request.itemsWithPagination = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestForPageOneOnly(1);
  }
}
