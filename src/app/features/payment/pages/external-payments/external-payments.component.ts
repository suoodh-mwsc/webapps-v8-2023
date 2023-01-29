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
import { ExternalPaymentsService } from './../../../../shared/services/finance/external-payments.service';
// Core Services
import { PaginationService } from './../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-external-payments',
  templateUrl: './external-payments.component.html',
  styleUrls: ['./external-payments.component.scss']
})
export class ExternalPaymentsComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'External Payments', page_title_simple: 'external payments' }
  // API Data
  request: any = { items: [], pagination: [], total_pages: 0, leave_quota: [], new_request: [], current_year: null, logged_in_profile: [], api_update_available: false, model_state_error: [], general_api_error: '' };
  // API Data - UI Realted
  requestUi: any = { viewType: 'card', show_loader: false, loader_size: 'xl' };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.staffPortal.leaveRequests.defaultMaxPaginations;
  // Filter
  filter: any = {
    selected_action: 'search_by_customer_id',
    show_filters: false, show_filter_loader: false, default_page_size: null,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    search_text: '', search_date: '', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: [],

    selected_date: '', pending_date_list: [], disable_filter_pending_date: true, show_loader_pending_date: false,
    selected_organization: '', organization_list: [], disable_filter_organization: true, show_loader_organization: false,
  };

  constructor(
    private _uiConfigService: UiConfigService,
    private _externalPayments: ExternalPaymentsService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {
    // Setting Up default view
    let viewtype = this._uiConfigService.getUiConfigDataFromStorage('ui-view-leave');
    this.requestUi.viewType = viewtype;

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
    if ($event === 'search_by_customer_id') {
    } else if ($event === 'search_by_pending') {
      this.getPendingDates();
      this.getOrganizations();
    } else if ($event === 'search_by_daily') {
      this.getOrganizations();
    } else if ($event === 'search_by_dc_payments') {
      this.getOrganizations();
    }
  }

  
  getPendingDates() {
    this.filter.pending_date_list = [];
    this.requestUi.show_loader = true;
    this._externalPayments.getPendingDates()
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getPendingDates -> data::', data);
        this.filter.pending_date_list = data;
        this.requestUi.show_loader = false;
        this.filter.disable_filter_pending_date = false;
      }, (error: Response | any) => {
        console.log('getPendingDates -> error::', error);
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

  getOrganizations() {
    this.filter.organization_list = [];
    this.requestUi.show_loader = true;
    this._externalPayments.getOrganizations()
      .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
        console.log('getOrganizations data', data);
        let organizationData = {
          Id: 0, Name: '*', ShortCode: 'All',
        };
        this.filter.organization_list.push(organizationData);
        this.filter.disable_filter_organization = false;
        data.forEach(elemt => {
          this.filter.organization_list.push(elemt);
        });
        this.requestUi.show_loader = false;
      }, (error: Response | any) => {
        console.log('getOrganizations -> error ::', error);
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

  // First Page Data from Server
  getSearchRequest() {
    this.requestUi.show_loader = true;
    this.request.items = [];


    if (this.filter.selected_action === 'search_by_customer_id') {
      if (!this.filter.search_text) {
        console.log('Search Text Box Empty');
        this.requestUi.show_loader = false;
      } else {
        this._externalPayments.postPaymentTransactionsSearchByCustomerId(this.filter.search_text)
          .pipe(takeUntil(this.componentDestroyed$)).subscribe((data: any) => {
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
    }

    if (this.filter.selected_action === 'search_by_pending') {
      if (!this.filter.selected_date || !this.filter.selected_organization) {
        console.log('Search Date or Organization Selection Empty');
        this.requestUi.show_loader = false;
      } else {
        this._externalPayments.postPendingPaymentTransactions(
          {
            TakenOn: this.filter.search_date,
            OrganizationId: this.filter.selected_organization,
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
    }

    if (this.filter.selected_action === 'search_by_daily') {
      if (!this.filter.search_date || !this.filter.selected_organization) {
        console.log('Search Date or Organization Selection Empty');
      } else {
        this._externalPayments.postDailyPaymentTransactions(
          {
            TakenOn: this.filter.search_date,
            OrganizationId: this.filter.selected_organization,
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
    }

    if (this.filter.selected_action === 'search_by_dc_payments') {
      if (!this.filter.search_date || !this.filter.selected_organization) {
        console.log('Search Date or Organization Selection Empty');
      } else {
        this._externalPayments.postDcPaymentTransactions(
          {
            TakenOn: this.filter.search_date,
            OrganizationId: this.filter.selected_organization,
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
    }

    this.requestUi.show_loader = false;
  }

}
