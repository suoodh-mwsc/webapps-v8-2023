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
import { MultipleAccountPaymentsService } from './../../../../shared/services/finance/multiple-account-payments.service';
// Core Services
import { PaginationService } from './../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-multiple-account-payments',
  templateUrl: './multiple-account-payments.component.html',
  styleUrls: ['./multiple-account-payments.component.scss']
})
export class MultipleAccountPaymentsComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Multiple Account Payments', page_title_simple: 'multiple account payments' }
  // API Data
  request: any = { items: [], pagination: [], total_pages: 0, leave_quota: [], new_request: [], current_year: null, logged_in_profile: [], api_update_available: false, model_state_error: [], general_api_error: '' };
  // API Data - UI Realted
  requestUi: any = { viewType: 'card', show_loader: false, loader_size: 'xl' };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.staffPortal.leaveRequests.defaultMaxPaginations;
  // Filter
  filter: any = {
    selected_action: 'search_by_daily',
    show_filters: false, show_filter_loader: false, default_page_size: null,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    search_text: '', search_date: '2022-03-27', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: [],

    selected_date: '', pending_date_list: [], disable_filter_pending_date: true, show_loader_pending_date: false,
    selected_organization: '', organization_list: [], disable_filter_organization: true, show_loader_organization: false,
  };

  constructor(
    private _uiConfigService: UiConfigService,
    private _multipleAccountPayments: MultipleAccountPaymentsService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-leave');
    this.requestUi.viewType = viewtype;
    //
    this.filter.search_text = '30012345';
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
    if ($event === 'search_by_pending') {
      this.getSearchRequest();
    } else if ($event === 'search_by_daily') {
    }
  }


  // First Page Data from Server
  getSearchRequest() {
    this.requestUi.show_loader = true;
    this.request.items = [];
    if (this.filter.selected_action === 'search_by_pending') {
      if (!this.filter.search_text) {
        console.log('Search Text Box Empty');
        this.requestUi.show_loader = false;
      } else {
        this._multipleAccountPayments.postMultipleAccountPaymentPendingSAPUploads()
          .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
            console.log('PendingSAPUploads data', data);
            // Closing the alert - apiRequest Info
            setTimeout(() => {
              $('#apiRequest-info-alert').alert('close');
            }, 4000);
            this.request.items = data;
            this.requestUi.show_loader = false;
          }, (error: Response | any) => {
            console.log('PendingSAPUploads error', error);
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
    if (this.filter.selected_action === 'search_by_daily') {
      this._multipleAccountPayments.postMultipleAccountPaymentByDate(this.filter.search_date)
        .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
          console.log('PaymentByDate data', data);
          // Closing the alert - apiRequest Info
          setTimeout(() => {
            $('#apiRequest-info-alert').alert('close');
          }, 4000);
          this.request.items = data;
          this.requestUi.show_loader = false;
        }, (error: Response | any) => {
          console.log('PaymentByDate error', error);
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
    this.requestUi.show_loader = false;
  }

}
