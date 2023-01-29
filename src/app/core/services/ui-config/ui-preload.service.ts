import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject, throwError, Subscriber, Subject, interval, Subscription, of } from 'rxjs';
// API Data Services
import { LeaveDashboardService } from './../../../shared/services/dashboard/leave-dashboard.service';

const UI_OT_DASHBOARD_LIST = 'ui-ot-dashboard-list';
const UI_OT_DASHBOARD_SELECTED = 'ui-ot-dashboard-selected';
const UI_OT_DASHBOARD_MONTH_SELECTED = 'ui-ot-dashboard-month-selected';
const UI_OT_DASHBOARD_YEAR_SELECTED = 'ui-ot-dashboard-year-selected';


const UI_LEAVE_DASHBOARD_LIST = 'ui-leave-dashboard-list';
const UI_LEAVE_DASHBOARD_SELECTED = 'ui-leave-dashboard-selected';
const UI_LEAVE_DASHBOARD_MONTH_SELECTED = 'ui-leave-dashboard-month-selected';
const UI_LEAVE_DASHBOARD_YEAR_SELECTED = 'ui-leave-dashboard-year-selected';

const UI_DASHBOARD_MONTH_LIST = 'ui-dashboard-month-list';
const UI_DASHBOARD_YEAR_LIST = 'ui-dashboard-year-list';


@Injectable({
  providedIn: 'root'
})
export class UiPreloadService {


  // API Data
  request_data: any = {
    current_year: '', current_month: '',
    dashboard_list: '', year_list: '', month_list: '',
    selected_year: '', selected_month: '',
    dashboard_model_state_error: [], dashboard_general_api_error: '',
    year_model_state_error: [], year_general_api_error: '',
    month_model_state_error: [], month_general_api_error: ''
  };

  // API Data
  request_data_overtime: any = {
    dashboard_list: '',
    selected_dashboard: '', selected_year: '', selected_month: '',
    dashboard_model_state_error: [], dashboard_general_api_error: '',
    year_model_state_error: [], year_general_api_error: '',
    month_model_state_error: [], month_general_api_error: ''
  };

  // API Data
  request_data_leave: any = {
    dashboard_list: '',
    selected_dashboard: '', selected_year: '', selected_month: '',
    dashboard_model_state_error: [], dashboard_general_api_error: '',
    year_model_state_error: [], year_general_api_error: '',
    month_model_state_error: [], month_general_api_error: ''
  };

  constructor(
    private _cookieService: CookieService,
    private _leaveDashboardService: LeaveDashboardService) { }

  getDashboardList() {
    this._leaveDashboardService.getSupvPortalMyDashboardList().subscribe((data: any) => {
      console.log('getMyDashboardList data', data);
      
      this.request_data.dashboard_list = data;
      this.request_data_overtime.dashboard_list = data.filter(dashboardItem => dashboardItem.organization_dashboard_type === 'Leave');
      this.request_data_leave.dashboard_list = data.filter(dashboardItem => dashboardItem.organization_dashboard_type === 'Overtime');

    }, (error: Response | any) => {
      return throwError(new Error(error.status));
    });
  }


  public getSelectedOTDashboard() {
    const cookieExists: boolean = this._cookieService.check('ui-ot-dashboard-selected');
    if (cookieExists === true) {
      return this._cookieService.get(UI_OT_DASHBOARD_SELECTED);
    } else {
      return 'card';
    }
  }

  public setSelectedOTDashboard(data) {
    this._cookieService.delete(UI_OT_DASHBOARD_SELECTED);
    this._cookieService.set(UI_OT_DASHBOARD_SELECTED, data);
  }


  public getSelectedLeaveDashboard() {
    const cookieExists: boolean = this._cookieService.check('ui-leave-dashboard-selected');
    if (cookieExists === true) {
      return this._cookieService.get(UI_LEAVE_DASHBOARD_SELECTED);
    } else {
      return 'card';
    }
  }

  public setSelectedLeaveDashboard(data) {
    this._cookieService.delete(UI_OT_DASHBOARD_SELECTED);
    this._cookieService.set(UI_OT_DASHBOARD_SELECTED, data);
  }
}
