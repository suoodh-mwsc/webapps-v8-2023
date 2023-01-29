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
  selector: 'app-application-pending',
  templateUrl: './application-pending.component.html',
  styleUrls: ['./application-pending.component.scss']
})
export class ApplicationPendingComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Pending Application', page_title_simple: 'pending application' }
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
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };

  constructor(
    private _uiConfigService: UiConfigService,
    private _eServiceApplication: EServiceApplicationService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-leave');
    this.requestUi.viewType = viewtype;

    this.filter.searchText = '30012345',
      this.getRequestForPageOneOnly();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  // First Page Data from Server
  getRequestForPageOneOnly() {
    this.requestUi.show_loader = true;
    this.request.items = [];
    this._eServiceApplication.postPendingApplications(
      {
        PageSize: this.defaultPaginationSize,
        PageNumber: 1
      }
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
      console.log('requestList data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      this.request.items = data.UtilityApplications;
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
