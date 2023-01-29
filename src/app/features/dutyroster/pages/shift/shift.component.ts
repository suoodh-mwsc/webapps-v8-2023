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
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  private routeParams$: any;
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Shift', page_title_simple: 'shift' }
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
    selected_shiftgroup: '', selected_tab: '',
    todayDate: '', lastYear: 0, thisYear: 0, thisWeekNum: 0,
    show_deleted: true, user_access: 'supervisor',
    show_filters: false, show_filter_loader: false, default_page_size: 100,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    searchText: '', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };
  // 
  headerButtons = [
    { title: 'Week', weekNo: 0, year: 0 },
    { title: 'Week', weekNo: 0, year: 0 },
    { title: 'Week', weekNo: 0, year: 0 },
    { title: 'Prev Week', weekNo: 0, year: 0 },
    { title: 'Current Week', weekNo: 0, year: 0 },
    { title: 'Next Week', weekNo: 0, year: 0 },
    { title: 'Week', weekNo: 0, year: 0 },
    { title: 'Week', weekNo: 0, year: 0 },
    { title: 'Week', weekNo: 0, year: 0 },
    { title: 'Week', weekNo: 0, year: 0 },
    { title: 'Week', weekNo: 0, year: 0 },
  ];


  week_shifts : any = {
    week_data: [], weeklyshift_data: [], 
  };;


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

    // this.filter.thisYear = moment().format('YYYY');
    // this.filter.thisWeekNum = moment(this.filter.todayDate).week();
    this.filter.todayDate = moment().toISOString();

    console.log('constructor -> this.filter.lastYear ::', this.filter.lastYear);
    console.log('constructor -> this.filter.thisWeekNum ::', this.filter.thisWeekNum);
    console.log('constructor -> this.filter.todayDate ::', this.filter.todayDate);

    console.log('constructor routeParams -> this.filter.selected_shiftgroup ::', this.filter.selected_shiftgroup);
    this.routeParams$ = this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.filter.selected_shiftgroup = params.get('shiftGroupId')
      console.log('constructor routeParams -> this.filter.selected_shiftgroup ::', this.filter.selected_shiftgroup);
      // this.getRequestForPageOne();
      this.getTopHeaderButtonDetailsFromAPI();
    });

    var sun = new Date();
    var mon = new Date();
    var tue = new Date();
    var wed = new Date();
    var thu = new Date();
    var fri = new Date();
    var sat = new Date();

    this.week_shifts.week_data = [
      { date: sun, normalshifts: [], offShifts: [], cancelled_normalshifts: [], cancelled_offShifts: [] },
      { date: mon, normalShifts: [], offShifts: [], cancelled_normalshifts: [], cancelled_offShifts: [] },
      { date: tue, normalShifts: [], offShifts: [], cancelled_normalshifts: [], cancelled_offShifts: [] },
      { date: wed, normalShifts: [], offShifts: [], cancelled_normalshifts: [], cancelled_offShifts: [] },
      { date: thu, normalShifts: [], offShifts: [], cancelled_normalshifts: [], cancelled_offShifts: [] },
      { date: fri, normalShifts: [], offShifts: [], cancelled_normalshifts: [], cancelled_offShifts: [] },
      { date: sat, normalShifts: [], offShifts: [], cancelled_normalshifts: [], cancelled_offShifts: [] },
    ];
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    this.routeParams$.unsubscribe();
  }


  getTopHeaderButtonDetailsFromAPI() {
    return new Promise(resolve => {
      this._dutyRosterSupervisor.getCurrentWeekDetails().pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getTopHeaderButtonDetailsFromAPI -> data ::', data);
        this.filter.lastYear = data.Year - 1;
        this.filter.thisYear = data.Year;
        this.filter.thisWeekNum = data.WeekNo;
        this.filter.selected_tab = data.WeekNo;
        console.log('getTopHeaderButtonDetailsFromAPI    -> this.filter.lastYear ::', this.filter.lastYear);
        console.log('getTopHeaderButtonDetailsFromAPI    -> this.filter.thisYear ::', this.filter.thisYear);
        console.log('getTopHeaderButtonDetailsFromAPI -> this.filter.thisWeekNum ::', this.filter.thisWeekNum);
        console.log('getTopHeaderButtonDetailsFromAPI   -> this.filter.todayDate ::', this.filter.todayDate);

        this.setWeekDetailsInTopHeaderButton(0, (data.WeekNo - 4), (data.Year));
        this.setWeekDetailsInTopHeaderButton(1, (data.WeekNo - 3), (data.Year));
        this.setWeekDetailsInTopHeaderButton(2, (data.WeekNo - 2), (data.Year));
        this.setWeekDetailsInTopHeaderButton(3, (data.WeekNo - 1), (data.Year));
        this.setWeekDetailsInTopHeaderButton(4, (data.WeekNo), (data.Year));
        this.setWeekDetailsInTopHeaderButton(5, (data.WeekNo + 1), (data.Year));
        this.setWeekDetailsInTopHeaderButton(6, (data.WeekNo + 2), (data.Year));
        this.setWeekDetailsInTopHeaderButton(7, (data.WeekNo + 3), (data.Year));
        this.setWeekDetailsInTopHeaderButton(8, (data.WeekNo + 4), (data.Year));
        this.setWeekDetailsInTopHeaderButton(9, (data.WeekNo + 5), (data.Year));
        this.setWeekDetailsInTopHeaderButton(10, (data.WeekNo + 6), (data.Year));

        this.requestUi.show_loader = false;
        resolve(data);
      }, (error: Response | any) => {
        this.requestUi.show_loader = false;
        return throwError(new Error(error.status));
      });
    });
  }



  private setWeekDetailsInTopHeaderButton(buttonIndex, weekNo, year) {
    console.log('setWeekDetailsInTopHeaderButton top ', buttonIndex, weekNo, year);
    if (weekNo < 1) {
      if (year === 2021) {
        weekNo = 53;
      } else {
        weekNo = 52;
      }
      year = year - 1;
    }

    if (year === 2021) {
      if (weekNo > 53) {
        weekNo = weekNo - 53;
        year = year + 1;
      }
    } else {
      if (weekNo > 52) {
        weekNo = weekNo - 52;
        year = year + 1;
      }
    }

    if (this.headerButtons[buttonIndex].title === 'Week') {
      this.headerButtons[buttonIndex].title = '(' + year + ') Week-' + weekNo;
    }
    this.headerButtons[buttonIndex].weekNo = weekNo;
    this.headerButtons[buttonIndex].year = year;
    console.log('setWeekDetailsInTopHeaderButton bottom', weekNo, year);
  }

  selectTab(tabDataWeek, tabDataYear) {
    console.log('selectTab tabData', tabDataWeek);
    this.filter.selected_tab = tabDataWeek;
    console.log('selectTab this.filter.selected_tab', this.filter.selected_tab);

    this.getWeekShiftDataFromAPI(tabDataWeek, tabDataYear);
  }

  getWeekShiftDataFromAPI(weekNo, year) {
    return new Promise(resolve => {
      this._dutyRosterSupervisor.getShiftGroupsByShiftGroupId(this.filter.selected_shiftgroup, weekNo, year).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getWeekShiftDataFromAPI -> data ::', data);
        this.week_shifts.weeklyshift_data = data;

        this.getWeekData();

        resolve(data);
      }, (error: Response | any) => {
        this.requestUi.show_loader = false;
        return throwError(new Error(error.status));
      });
    });
  }

  getWeekData() {
    var sun = new Date(this.week_shifts.weeklyshift_data.StartsOn);
    var mon = new Date(this.week_shifts.weeklyshift_data.StartsOn);
    var tue = new Date(this.week_shifts.weeklyshift_data.StartsOn);
    var wed = new Date(this.week_shifts.weeklyshift_data.StartsOn);
    var thu = new Date(this.week_shifts.weeklyshift_data.StartsOn);
    var fri = new Date(this.week_shifts.weeklyshift_data.StartsOn);
    var sat = new Date(this.week_shifts.weeklyshift_data.StartsOn);
    // console.log('sun.getDate()', sun.getDate());
    mon.setDate(sun.getDate() + 1);
    tue.setDate(sun.getDate() + 2);
    wed.setDate(sun.getDate() + 3);
    thu.setDate(sun.getDate() + 4);
    fri.setDate(sun.getDate() + 5);
    sat.setDate(sun.getDate() + 6);

    this.week_shifts.week_data = [
      { date: sun },
      { date: mon },
      { date: tue },
      { date: wed },
      { date: thu },
      { date: fri },
      { date: sat }
    ];
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

  goToShiftGroup() {
    this._router.navigate(['/dutyroster/shiftgroup', 'supervisor']);
  }
}
