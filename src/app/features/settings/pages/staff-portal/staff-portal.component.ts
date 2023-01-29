import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import * as moment from 'moment';
declare var $: any;
import { environment } from './../../../../../environments//environment';
// Ui Config
import { UiConfigService } from './../../../../core/services/ui-config/ui-config.service';
// API Data Services
import { MyLeaveService } from './../../../../shared/services/leave/my-leave.service';
// Core Services
import { PaginationService } from './../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../core/services/error-handler/yoda-core-error-handler.service';

@Component({
  selector: 'app-staff-portal',
  templateUrl: './staff-portal.component.html',
  styleUrls: ['./staff-portal.component.scss']
})
export class StaffPortalComponent implements OnInit, OnDestroy {

  // OnDestroy 
  componentDestroyed$: Subject<boolean> = new Subject();
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'Settings', page_title_simple: 'settings' }
  // API Data
  request: any = { items: [], pagination: [], total_pages: 0, leave_quota: [], new_request: [], current_year: null, logged_in_profile: [], api_update_available: false, model_state_error: [], general_api_error: '' };
  // API Data - UI Realted
  requestUi: any = { viewType: 'card', show_loader: false, loader_size: 'xl' };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.staffPortal.leaveRequests.defaultMaxPaginations;
  // Filter
  filter: any = {
    show_filters: false, show_filter_loader: false, 'default_page_size': null,
    disable_leave_type: false, disable_search_text: false, disable_filter_year: false, disable_filter_supervisor_approval_status: false,
    searchText: '', year: '', leave_type: null, leave_type_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(
    private _uiConfigService: UiConfigService,
    private _myLeaveService: MyLeaveService,
    private _corePaginationService: PaginationService,
    private _coreErrorHandler: YodaCoreErrorHandlerService) {

    this._uiConfigService.getUiConfigData().subscribe((data) => {
      data.forEach(ele => {
        let viewtype = this._uiConfigService.getUiConfigDataFromStorage(ele.page_title);
        ele.view_type = viewtype;

        if (ele.avatar_settings === true) {
          let show_avatar = this._uiConfigService.getUiAvatarConfigDataFromStorage(ele.page_title);
          console.log('Settings-StaffPortalComponent -> show_avatar :: ', show_avatar);
          ele.show_avatar = show_avatar;
        }
      });
      this.request.items = data;
    });
    console.log('Settings-StaffPortalComponent -> this.request.items :: ', this.request.items);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Fixing the Memory Leak
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }


  changeView(requestObj, event) {
    console.log('changeView -> requestObj :: ', requestObj);
    this._uiConfigService.setUiConfigDataFromStorage(requestObj.page_title, event);
    requestObj.view_type = event;
  }


  changeAvatar(requestObj, event) {
    console.log('changeAvatar      -> event :: ', event);
    console.log('changeAvatar -> requestObj :: ', requestObj);

    this._uiConfigService.setUiAvatarConfigDataFromStorage(requestObj.page_title, event);
    requestObj.show_avatar = event;
    // console.log('changeAvatar      -> event :: ', event);
    // console.log('changeAvatar -> requestObj :: ', requestObj);

    let show_avatar_status = this._uiConfigService.getUiAvatarConfigDataFromStorage(requestObj.page_title);
    console.log('changeAvatar -> show_avatar_status :: ', show_avatar_status);
  }

  showHideFilters(event: any) {
    console.log(event);
    if (event === true) {
      this.filter.show_filters = true;
    }
    if (event === false) {
      this.filter.show_filters = false;
    }
  }

  changeViewX(event) {
  }
}
