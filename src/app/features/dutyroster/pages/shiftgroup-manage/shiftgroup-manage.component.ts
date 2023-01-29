import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import * as moment from 'moment';
declare var $: any;
// Env
import { environment } from './../../../../../environments//environment';
// Ui Config
import { UiConfigService } from './../../../../core/services/ui-config/ui-config.service';
// API Data Services
import { DutyRosterHrService } from './../../../../shared/services/duty-roster/duty-roster-hr.service';
import { DutyRosterSupervisorService } from './../../../../shared/services/duty-roster/duty-roster-supervisor.service';
import { DutyRosterCommonService } from './../../../../shared/services/duty-roster/duty-roster-common.service';
// Core Services
import { PaginationService } from './../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-shiftgroup-manage',
  templateUrl: './shiftgroup-manage.component.html',
  styleUrls: ['./shiftgroup-manage.component.scss']
})
export class ShiftgroupManageComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  private routeParams$: any;
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Manage Shiftgroup', page_title_simple: 'manage shiftgroup' }
  // API Data
  request: any = {
    user_access: 'supervisor',
    items: [], pagination: [], total_pages: 0, leave_quota: [], new_request: [], current_year: null,
    logged_in_profile: [], api_update_available: false, model_state_error: [], general_api_error: ''
  };
  // API Data - UI Realted
  requestUi: any = { viewType: 'card', show_loader: true, loader_size: 'xl' };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.eService.pendingApplications.defaultMaxPaginations;
  // Filter
  filter: any = {
    selected_shiftgroup_Id: '', selected_employee: [], selected_supervisor: [], selected_weeklyshift_years: [],
    show_deleted: true, user_access: 'supervisor',
    show_filters: false, show_filter_loader: false, default_page_size: 100,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    searchText: '', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };
  // Create New
  request_item: any = {
    disable_save_button: false, show_model_loader: false, api_update_available: false, model_state_error: [], general_api_error: '',
    shiftgroup_employee: '', shiftgroup_supervisor: '', weeklyshift_year: '', shift_template: '', year_list: [], shift_template_list: [],
    disable_year_list: true, disable_shift_template_list: true,
  };


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _uiConfigService: UiConfigService,
    private _dutyRosterHr: DutyRosterHrService,
    private _dutyRosterSupervisor: DutyRosterSupervisorService,
    private _dutyRosterCommon: DutyRosterCommonService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    // let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-leave');
    // this.requestUi.viewType = viewtype;

    console.log('constructor routeParams -> this.request.selected_shiftgroup_Id ::', this.request.selected_shiftgroup_Id);
    this.routeParams$ = this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.filter.selected_shiftgroup_Id = params.get('shiftGroupId')
      console.log('constructor routeParams -> this.request.selected_shiftgroup_Id ::', this.request.selected_shiftgroup_Id);
      this.getShiftgroupDetails();
      this.getShiftgroupYearList();
      this.getShiftTemplateList();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    this.routeParams$.unsubscribe();
  }




  hideViewCreateModal() {
    $('#ViewCreateModal').modal('hide');
    if (this.request.api_update_available === true) {
      console.log('requestToRefresh -> Changes Available');
      this.refreshApiData();
    } else {
      console.log('requestToRefresh -> Changes Not Available');
    }
  }

  showViewCreateModal() {
    $('#ViewCreateModal').modal('show');
  }




  hideViewCreateEmployeeModal() {
    $('#ViewCreateModal').modal('hide');
    if (this.request.api_update_available === true) {
      console.log('requestToRefresh -> Changes Available');
      this.refreshApiData();
    } else {
      console.log('requestToRefresh -> Changes Not Available');
    }
  }

  showViewCreateEmployeeModal() {
    $('#ViewCreateEmployeeModal').modal('show');
  }




  hideViewCreateSupervisorModal() {
    $('#ViewCreateSupervisorModal').modal('hide');
    if (this.request.api_update_available === true) {
      console.log('requestToRefresh -> Changes Available');
      this.refreshApiData();
    } else {
      console.log('requestToRefresh -> Changes Not Available');
    }
  }

  showViewCreateSupervisorModal() {
    $('#ViewCreateSupervisorModal').modal('show');
  }



  // First Page Data from Server
  getShiftgroupDetails() {
    console.log('getShiftgroupDetails -> this.filter.shiftGroupId ::', this.filter.shiftGroupId);
    this.requestUi.show_loader = true;

    this._dutyRosterCommon.getShiftGroupDetailsById(this.filter.selected_shiftgroup_Id)
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('postShiftGroupsAll -> data ::', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        this.request.items = data;
        console.log('getShiftgroupDetails -> this.request.items ::', this.request.items);
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


  getShiftgroupYearList() {
    this.request_item.year_list = [];
    var yearList;
    let i = 0;
    const max = 2;
    for (i = 0; i < max; i++) {
      yearList = moment().add(i, 'years').format('YYYY');
      let Year = Number(yearList); // Convert String to Number
      let yearsFilter = { Id: i, Year: Year };
      this.request_item.year_list.push(yearsFilter);
      this.request_item.disable_year_list = false;
    }
  }


  getShiftTemplateList() {
    console.log('getShiftTemplateList -> this.filter.shiftGroupId ::', this.filter.shiftGroupId);
    this.requestUi.show_loader = true;

    this._dutyRosterHr.getShiftTemplate()
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getShiftTemplateList -> data ::', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        this.request_item.shift_template_list = data;
        console.log('getShiftTemplateList -> this.request.items ::', this.request.items);
        this.request_item.disable_shift_template_list = false;
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


  postWeeklyshiftToShiftgroup() {
    console.log('postWeeklyshiftToShiftgroup -> this.request_item.shiftgroup_employee ::', this.request_item.shiftgroup_employee);
    this.requestUi.show_loader = true;
    this._dutyRosterCommon.getShiftGroupYearListByShiftGroupId(
      {
        Year: this.request_item.weeklyshift_year,
        ShiftGroup_Id: this.filter.selected_shiftgroup_Id,
        ShiftTemplate_Id: this.request_item.shift_template
      }
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
      console.log('postWeeklyshiftToShiftgroup -> data ::', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
    }, (error: Response | any) => {
      console.log('postWeeklyshiftToShiftgroup -> error ::', error);
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


  postAddEmployeeToShiftgroup() {
    console.log('postAddEmployeeToShiftgroup -> this.request_item.shiftgroup_employee ::', this.request_item.shiftgroup_employee);
    this.requestUi.show_loader = true;
    this._dutyRosterCommon.getShiftGroupYearListByShiftGroupId(
      {
        EmployeeId: this.request_item.shiftgroup_employee,
        ShiftGroup_Id: this.filter.selected_shiftgroup_Id
      }
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
      console.log('postAddEmployeeToShiftgroup -> data ::', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
    }, (error: Response | any) => {
      console.log('postAddEmployeeToShiftgroup -> error ::', error);
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


  postAddSupervisorToShiftgroup() {
    console.log('postAddSupervisorToShiftgroup -> this.filter.shiftgroup_supervisor ::', this.filter.shiftgroup_supervisor);
    this.requestUi.show_loader = true;
    this._dutyRosterCommon.getShiftGroupYearListByShiftGroupId(
      {
        EmployeeId: this.request_item.shiftgroup_supervisor,
        ShiftGroup_Id: this.filter.selected_shiftgroup_Id
      }
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
      console.log('postAddSupervisorToShiftgroup -> data ::', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
    }, (error: Response | any) => {
      console.log('postAddSupervisorToShiftgroup -> error ::', error);
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


  changeView(event) {
    console.log('changeView', event);
    this._uiConfigService.setUiConfigDataFromStorage('ui-view-leave', event)
    this.requestUi.viewType = event;
  }

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    console.log('onChangeEvent 400', event);
    this.resetApiErrorModal('');
  }

  resetApiErrorModal(functionName) {
    this.request_item.model_state_error = [];
    this.request_item.general_api_error = null;
    this.request_item.disable_save_button = false;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> model_state_error - ', this.request_item.model_state_error);
    console.log(functionName, ' -> general_api_error - ', this.request_item.general_api_error);
  }

  refreshApiData() {
    this.requestUi.show_loader = true;
    this.request.items = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getShiftgroupDetails();
  }
}
