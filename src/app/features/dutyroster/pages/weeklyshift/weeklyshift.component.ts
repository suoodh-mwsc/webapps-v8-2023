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
// Core Services
import { PaginationService } from './../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-weeklyshift',
  templateUrl: './weeklyshift.component.html',
  styleUrls: ['./weeklyshift.component.scss']
})
export class WeeklyshiftComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  private routeParams$: any;
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Weeklyshift', page_title_simple: 'weeklyshift' }
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
    selected_shiftgroup: [], selected_employee: [], selected_supervisor: [], selected_weeklyshift_years: [],
    show_deleted: true, user_access: 'supervisor',
    show_filters: false, show_filter_loader: false, default_page_size: 100,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    searchText: '', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _uiConfigService: UiConfigService,
    private _dutyRosterHr: DutyRosterHrService,
    private _dutyRosterSupervisor: DutyRosterSupervisorService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-leave');
    this.requestUi.viewType = viewtype;

    console.log('constructor routeParams -> this.filter.selected_shiftgroup_Id ::', this.filter.selected_shiftgroup_Id);
    console.log('constructor routeParams -> this.filter.selected_year ::', this.filter.selected_year);
    this.routeParams$ = this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.filter.selected_shiftgroup_Id = params.get('shiftGroupId');
      this.filter.selected_year = params.get('selectedYear');
      console.log('constructor routeParams -> this.filter.selected_shiftgroup_Id ::', this.filter.selected_shiftgroup_Id);
      console.log('constructor routeParams -> this.filter.selected_year ::', this.filter.selected_year);
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

  // First Page Data from Server
  getRequestForPageOne() {
    console.log('constructor routeParams -> this.filter.user_access ::', this.filter.user_access);
    this.requestUi.show_loader = true;
    this.request.items = [];

    this._dutyRosterHr.getWeeklyshiftByShiftGroupIdAndYear(this.filter.selected_shiftgroup_Id, this.filter.selected_year)
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getWeeklyshiftByShiftGroupIdAndYear -> data ::', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        this.request.items = data;
        console.log('getWeeklyshiftByShiftGroupIdAndYear -> this.request.items ::', this.request.items);
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
