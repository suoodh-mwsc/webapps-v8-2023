import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
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
// Core Services
import { PaginationService } from './../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-shiftgroup',
  templateUrl: './shiftgroup.component.html',
  styleUrls: ['./shiftgroup.component.scss']
})
export class ShiftgroupComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  private routeParams$: any;
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Shift Group', page_title_simple: 'shift group' }
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
    show_deleted: false, user_access: 'supervisor',
    show_filters: false, show_filter_loader: false, default_page_size: 100,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    searchText: '', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };
  // Create New
  request_item: any = {
    disable_save_button: false, show_model_loader: false, api_update_available: false, model_state_error: [], general_api_error: '',
    shiftgroup_name: '',
  };

  
  constructor(
    private _toastr: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _uiConfigService: UiConfigService,
    private _dutyRosterHr: DutyRosterHrService,
    private _dutyRosterSupervisor: DutyRosterSupervisorService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    // let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-leave');
    // this.requestUi.viewType = viewtype;

    console.log('constructor routeParams -> this.request.user_access ::', this.request.user_access);
    this.routeParams$ = this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.request.user_access = params.get('user')
      console.log('constructor routeParams -> this.request.user_access ::', this.request.user_access);
      this.getRequestForPageOne();
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

  // First Page Data from Server
  getRequestForPageOne() {
    console.log('constructor routeParams -> this.filter.user_access ::', this.filter.user_access);

    this.requestUi.show_loader = true;
    this.request.items = [];

    if (this.request.user_access === 'hr') {
      this._dutyRosterHr.postShiftGroupsAll(
        {
          ShowDeleted: this.filter.show_deleted,
          PageSize: this.defaultPaginationSize,
          PageNumber: 1
        }
      ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('postShiftGroupsAll -> data ::', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        this.request.items = data.Result;
        console.log('postShiftGroupsAll -> this.request.items ::', this.request.items);
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
    else if (this.request.user_access === 'supervisor') {
      this._dutyRosterSupervisor.postShiftGroupsSupervisor(
        {
          PageSize: this.defaultPaginationSize,
          PageNumber: 1
        }
      ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('postShiftGroupsSupervisor -> data ::', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        this.request.items = data.Result;
        console.log('postShiftGroupsSupervisor -> this.request.items ::', this.request.items);
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
  }


  create() {
    this.request.api_update_available = true;
    this.resetApiErrorModal('');
    this.request_item.show_model_loader = true;
    this._dutyRosterHr.postCreateShiftGroup(
      {
        Name: this.request_item.shiftgroup_name,
        Description: this.request_item.shiftgroup_description,   
      }
    ).subscribe((data: any) => {
      console.log('create data', data);
      this._toastr.info('Created', 'New Shiftgroup', { closeButton: true, timeOut: 3000, progressBar: true, enableHtml: true });
      this.request_item.show_model_loader = false;
    }, (error: Response | any) => {
      console.log('create -> error', error);
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

  showDeletedFilters(event: any) {
    console.log('showDeletedFilters', event);
    if (event === false) {
      this.filter.show_deleted = false;
      this.getRequestForPageOne();
    }

    if (event === true) {
      this.filter.show_deleted = true;
      this.getRequestForPageOne();
    }
  }

  changeView(event) {
    console.log('changeView', event);
    // this._uiConfigService.setUiConfigDataFromStorage('ui-view-dutyroster-shiftgroup', event);
    this.requestUi.viewType = event;
  }

  refreshApiData() {
    this.requestUi.show_loader = true;
    this.request.items = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestForPageOne();
  }
}
