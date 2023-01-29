import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import * as moment from 'moment';
declare var $: any;
// Env
import { environment } from './../../../../../environments//environment';
// Ui Config
import { UiConfigService } from './../../../../core/services/ui-config/ui-config.service';
// API Data Services
import { EServiceApplicationService } from './../../../../shared/services/e-service/e-service-application.service';
// Core Services
import { PaginationService } from './../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-application-report',
  templateUrl: './application-report.component.html',
  styleUrls: ['./application-report.component.scss']
})
export class ApplicationReportComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Application Report', page_title_simple: 'application report' }
  // API Data
  request: any = { items: [], pagination: [], total_pages: 0, leave_quota: [], new_request: [], current_year: null, logged_in_profile: [], api_update_available: false, model_state_error: [], general_api_error: '' };
  // API Data - UI Realted
  requestUi: any = { viewType: 'card', show_loader: true, loader_size: 'xl' };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.eService.pendingApplications.defaultMaxPaginations;
  // Filter
  filter: any = {
    show_filters: false, show_filter_loader: false, default_page_size: 100,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    searchText: '', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: [],
    todayDate: '',
    fromDate: '', disable_filter_from_date: false,
    todate: '', disable_filter_to_date: false,
    application_count_canceled: 0, disable_filter_application_count_canceled: false,
    application_count_completed: 0, disable_filter_application_count_completed: false,
    application_count_draft: 0, disable_filter_application_count_draft: false,
    application_count_incomplete: 0, disable_filter_application_count_incomplete: false,
  };

  constructor(
    private _uiConfigService: UiConfigService,
    private _eServiceApplication: EServiceApplicationService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-leave');
    this.requestUi.viewType = viewtype;

    this.filter.todayDate = moment().toISOString();
    // this.filter.todayDate = moment('27-03-2022').format('DD/MM/YYYY');
    if (this.filter.todayDate !== null) {
      // this.filter.fromDate = moment(this.filter.todayDate).subtract(190, 'days').local().format();
      // this.filter.toDate = moment(this.filter.todayDate).subtract(150, 'days').local().format();

      this.filter.fromDate = moment(this.filter.todayDate).subtract(30, 'days').local().format();
      this.filter.toDate = moment(this.filter.todayDate).add(1, 'days').local().format();
      if (this.filter.fromDate !== null && this.filter.toDate !== null) {
        this.getDataFromApi();
      }
    }
    console.log('requestList this.filter.todayDate ::', this.filter.todayDate);
    console.log('requestList  this.filter.fromDate ::', this.filter.fromDate);
    console.log('requestList    this.filter.toDate ::', this.filter.toDate);
  }


  ngOnInit() {
  }


  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }


  // First Page Data from Server
  getDataFromApi() {
    this.filter.application_count_canceled = 0;
    this.filter.application_count_completed = 0;
    this.filter.application_count_draft = 0;
    this.filter.application_count_incomplete = 0;

    this.requestUi.show_loader = true;
    this.request.items = [];
    this._eServiceApplication.postApplicationReport(
      {
        From: this.filter.fromDate,
        To: this.filter.toDate,
      }
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
      console.log('requestList data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      this.request.items = data;
      data.forEach(element => {
        console.log('element', element);
        if (element.CurrentStageDescription === 'Canceled') {
          this.filter.application_count_canceled++;
          console.log('Canceled', this.filter.application_count_canceled);
        } else if (element.CurrentStageDescription === 'Completed') {
          this.filter.application_count_completed++;
          console.log('Completed', this.filter.application_count_completed);
        } else if (element.CurrentStageDescription === 'Draft') {
          this.filter.application_count_draft++;
          console.log('Draft', this.filter.application_count_draft);
        } else if (element.CurrentStageDescription === 'Incomplete') {
          this.filter.application_count_incomplete++;
          console.log('Incomplete', this.filter.application_count_incomplete);
        }
      });
      console.log('requestList this.request.items', this.request.items);
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
