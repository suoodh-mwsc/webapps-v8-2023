import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import * as moment from 'moment';
declare var $: any;
// Env
import { environment } from './../../../../../environments/environment';
// Ui Config
import { UiConfigService } from './../../../../core/services/ui-config/ui-config.service';
// API Data Services
import { TppaPaymentsService } from './../../../../shared/services/payment/tppa-payments.service';
// Core Services
import { PaginationService } from './../../../../core/services/pagination/pagination.service';
import { PaginationYodaService } from './../../../../core/services/pagination/pagination-yoda.service';
import { YodaCoreErrorHandlerService } from './../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-tppa-payments',
  templateUrl: './tppa-payments.component.html',
  styleUrls: ['./tppa-payments.component.scss']
})
export class TppaPaymentsComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'TPPA Payments', page_title_simple: 'tppa payments' }
  // API Data
  request: any = { items: [], pagination: [], total_pages: 0, leave_quota: [], new_request: [], current_year: null, logged_in_profile: [], api_update_available: false, model_state_error: [], general_api_error: '' };
  // API Data - UI Realted
  requestUi: any = { viewType: 'card', show_loader: false, loader_size: 'xl' };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.finance.onlineApplicationPayments.defaultMaxPaginations;
  // Filter
  filter: any = {
    pagination_type: 'pagination_result',
    selected_action: 'search_by_customer_id', selected_transaction_view: 'online_payment', show_pending_sap: false,
    show_filters: false, show_filter_loader: false, default_page_size: null,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    search_text: '', search_date: '', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };

  constructor(
    private _uiConfigService: UiConfigService,
    private _tppaPayments: TppaPaymentsService,
    private _corePaginationYoda: PaginationYodaService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-leave');
    this.requestUi.viewType = viewtype;
    // this.filter.searchText = '30012345',
    //this.filter.search_text = '30061924';
    this.getSearchRequest(1);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  onChangeEventForType($event) {
    console.log('onChangeEventForType $event', $event);
    if ($event === 'search_by_customer_id') {
    } else if ($event === 'search_by_pending') {
      this.getSearchRequest(1);
    } else if ($event === 'search_by_daily') {
    }
  }


  showHidePendingSAP(event: any) {
    console.log('showHidePendingSAP', event);
    if (event === true) {
      this.filter.show_pending_sap = true;
    }
    if (event === false) {
      this.filter.show_pending_sap = false;
    }
  }

  // First Page Data from Server
  getSearchRequest(pageNo) {
    this.requestUi.show_loader = true;
    this.request.items = [];
    this._tppaPayments.postTppaPayments(pageNo, this.defaultPaginationSize, this.filter.search_text, this.filter.show_pending_sap,
      this.filter.search_date).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('requestList data', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        if (data.PaginationInfo.TotalPages > 0) {
          this._corePaginationYoda.generateAllPages(this.defaultPaginationSize, data, this.filter.pagination_type).then((listPagination: any) => {
            this.request.items = listPagination.items;
            this.request.pagination = listPagination;
            this.request.total_pages = listPagination.total_pages;
            console.log('requestList this.request.items ::', this.request.items);
            console.log('requestList this.request.pagination ::', this.request.pagination);
            console.log('requestList this.request.total_pages ::', this.request.total_pages);
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


  getSearchRequestFromPagination(pageNo) {
    this.requestUi.show_loader = true;
    this.request.items = [];
    this._tppaPayments.postTppaPayments(pageNo, this.defaultPaginationSize, this.filter.search_text, this.filter.show_pending_sap,
      this.filter.search_date).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('requestList data', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        if (data.PaginationInfo.TotalPages) {
          this._corePaginationYoda.getPageFromPaginationNo(pageNo, data, this.filter.pagination_type).then((listPagination: any) => {
            this.request.items = listPagination.items;
            this.request.pagination = listPagination;
            this.request.total_pages = listPagination.total_pages;
            console.log('requestList this.request.items ::', this.request.items);
            console.log('requestList this.request.pagination ::', this.request.pagination);
            console.log('requestList this.request.total_pages ::', this.request.total_pages);
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

}
