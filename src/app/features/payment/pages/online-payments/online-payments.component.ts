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
import { OnlinePaymentsService } from './../../../../shared/services/finance/online-payments.service';
// Core Services
import { PaginationService } from './../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-online-payments',
  templateUrl: './online-payments.component.html',
  styleUrls: ['./online-payments.component.scss']
})
export class OnlinePaymentsComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Online Payments', page_title_simple: 'online payments' }
  // API Data
  request: any = { items: [], pagination: [], total_pages: 0, leave_quota: [], new_request: [], current_year: null, logged_in_profile: [], api_update_available: false, model_state_error: [], general_api_error: '' };
  // API Data - UI Realted
  requestUi: any = { viewType: 'card', show_loader: false, loader_size: 'xl' };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.finance.onlineApplicationPayments.defaultMaxPaginations;
  // Filter
  filter: any = {
    selected_action: 'search_by_customer_id', selected_transaction_view: 'online_payment',
    show_filters: false, show_filter_loader: false, default_page_size: null,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    search_text: '', search_date: '', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };

  constructor(
    private _uiConfigService: UiConfigService,
    private _onlinePayment: OnlinePaymentsService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-leave');
    this.requestUi.viewType = viewtype;

    // this.filter.searchText = '30012345',
    this.filter.searchText = '30061924';
    this.getSearchRequest();
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
      this.filter.selected_transaction_view = 'online_payment';
    } else if ($event === 'search_by_transaction_id') {
      this.filter.selected_transaction_view = 'online_payment';
    } else if ($event === 'search_by_pending') {
      this.filter.selected_transaction_view = 'online_payment';
      this.getSearchRequest();
    } else if ($event === 'search_by_daily') {
      this.filter.selected_transaction_view = 'online_payment';
    } else if ($event === 'search_by_application') {
      this.filter.selected_transaction_view = 'online_application';
      this.getSearchRequest();
    }
  }

  // First Page Data from Server
  getSearchRequest() {
    this.requestUi.show_loader = true;
    this.request.items = [];

    if (this.filter.selected_action === 'search_by_customer_id') {
      this._onlinePayment.postOnlinePaymentSearchByCustomerId(
        {
          'AccountNo': this.filter.searchText,
        }
      ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('requestList data', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        this.request.items = data;
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
    else if (this.filter.selected_action === 'search_by_transaction_id') {
      this._onlinePayment.postOnlinePaymentSearchByTransactionId(
        {
          'TransactionNo': this.filter.searchText,
        }
      ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('requestList data', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        this.request.items = data;
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
    else if (this.filter.selected_action === 'search_by_pending') {
      this._onlinePayment.getOnlinePaymentNotUploadedToSAP().pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getOnlinePaymentNotUploadedToSAP -> requestList data', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        this.request.items = data;
        this.requestUi.show_loader = false;
      }, (error: Response | any) => {
        console.log('getOnlinePaymentNotUploadedToSAP -> requestList data', error);
        if (error) {
          this._coreErrorHandler.handleError(error).then((apiError: any) => {
            this.request.general_api_error = apiError.general_api_error;
            this.request.model_state_error = apiError.model_state_error;
          });
        }
        this.requestUi.show_loader = false;
        return throwError(new Error(error.status));
      });
    } else if (this.filter.selected_action === 'search_by_daily') {
      this._onlinePayment.postOnlinePaymentSearchByDate(
        {
          'SearchDate': this.filter.search_date,
        }
      ).pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('requestList data', data);
        // Closing the alert - apiRequest Info
        setTimeout(() => {
          $('#apiRequest-info-alert').alert('close');
        }, 4000);
        this.request.items = data;
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
    else if (this.filter.selected_action === 'search_by_application') {
      this._onlinePayment.postOnlinePaymentSearchForApplication(
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
        this.request.items = data.Payments;
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

}
