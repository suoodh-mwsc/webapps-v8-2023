import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
// Env
import { environment } from '../../../../environments/environment';
// Header
import { HttpHeaderService } from './../../../core/services/token/http-header.service';


@Injectable({
  providedIn: 'root'
})
export class MySubordinatesService {

  logged_in_user: any;
  // subordinatesList: any = [];
  // subordinatesArryFilters: any;
  subordinateAvatorList: any = [];
  subordinateAvatorArryFilters: any;
  subordinateBulkList: any = [];
  subordinateBulkArryFilters: any;


  constructor(
    private _cookieService: CookieService,
    private _httpHeaderService: HttpHeaderService,
    private _http: HttpClient,
    private sanitizer: DomSanitizer) {
    this.logged_in_user = JSON.parse(localStorage.getItem('myProfile'));
    console.log('logged_in_user ', this.logged_in_user);
  }

  // Jedi
  // GET  /v1​/jedi​/pending-approval-count
  getPendingApprovalCount() {
    const httpOptions = this._httpHeaderService.prepareOptions();

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/jedi/pending-approval-count`, httpOptions)
      .pipe(map(res => {
        return res;
      },
        catchError((error: any) => {
          console.log('supv-portal-base -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  getStaffPortalCalendarEvents(fromDate, todate, employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const params = `?from=${fromDate}&to=${todate}&employee_id=${employeeId}&show_leave_requests=true&show_overtime_requests=true&show_holidays=true&show_amg_attendances=true&show_sap_attendances=true`;
    const params = `?from=${fromDate}&to=${todate}&employee_id=${employeeId}&calendar_type=full_calendar&show_leave_requests=true&show_overtime_requests=true&show_holidays=true&show_amg_attendances=true&show_sap_attendances=true&show_duty_shifts=true`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/calendar-events` + params, httpOptions)
      .pipe(map(res => {
        console.log('staff-portal-leave-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  getMySubordinates(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    let params = '';

    if (this.logged_in_user.employee_id === '1222' && environment.production == false) {
      params = `?employee_id=${347}`;
      // params = `?employee_id=${331}`;
    } else if (this.logged_in_user.employee_id === '1203' && environment.production == false) {
      params = `?employee_id=${1078}`;
      // params = `?employee_id=${331}`;
    } else {
      params = `?employee_id=${employeeId}`;
    }

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/subordinates` + params, httpOptions)
      .pipe(map(res => {
        console.log('supv-portal-base -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('supv-portal-base -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  getStatisticsForSubordinates(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    let params = `?employee_id=${employeeId}`;

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v2/employee/statistics-for-year` + params, httpOptions)
      .pipe(map(res => {
        console.log('supv-portal-base -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('supv-portal-base -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  // /v2/employee/statistics-for-year
  getStatisticsForSubordinatesPromise(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    let params = `?employee_id=${employeeId}`;

    let promise = new Promise((resolve, reject) => {
      this._http.get(`${environment.staffAppApiConfig.api_url}v2/employee/statistics-for-year` + params, httpOptions)
        .toPromise()
        .then(res => { // Success
          console.log('employeeId :', employeeId, ' ->', res);
          resolve(res);
        }, msg => { // Error
          reject(msg);
        }
        );
    });
    return promise;
  }


  // GET   /v1​/employee​/subordinates
  getSupvPortalSubordinateFilter(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const params = `?employee_id=${employeeId}`;
    let params = '';

    if (this.logged_in_user.employee_id === '1222' && environment.production == false) {
      // params = `?employee_id=${237}`;  // Asif
      params = `?employee_id=${347}`; // Misru
      // params = `?employee_id=${331}`;

    } else if (this.logged_in_user.employee_id === '1203' && environment.production == false) {
      params = `?employee_id=${1078}`;
    } else {
      params = `?employee_id=${employeeId}`;
    }

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/subordinates` + params, httpOptions)
      .pipe(map((res: any) => {
        this.subordinateAvatorList = [];
        res.forEach((ele, index) => {
          this.subordinateAvatorArryFilters = [];
          let show_on_filter_avatar_ui = false;
          let show_on_model_ui = true;
          if (index < 10) {
            show_on_filter_avatar_ui = true;
            show_on_model_ui = false;
          } else {
            show_on_filter_avatar_ui = false;
            show_on_model_ui = true;
          }
          this.subordinateAvatorArryFilters = {
            employee_city: ele.employee_city,
            employee_department: ele.employee_department,
            employee_designation: ele.employee_designation,
            employee_division: ele.employee_division,
            employee_division_manager: ele.employee_division_manager,
            employee_domain_id: ele.employee_domain_id,
            employee_email: ele.employee_email,
            employee_ext_number: ele.employee_ext_number,
            employee_id: ele.employee_id,
            employee_last_known_location: ele.employee_last_known_location,
            employee_mobile_number: ele.employee_mobile_number,
            employee_name: ele.employee_name,
            employee_name_with_id: ele.employee_name_with_id,
            employee_office_location: ele.employee_office_location,
            employee_picture_path: ele.employee_picture_path,
            employee_section: ele.employee_section,
            employee_status: ele.employee_status,
            employee_work_anniversary: ele.employee_work_anniversary,
            employee_show_on_filter_avatar_ui: show_on_filter_avatar_ui,
            employee_show_on_model_ui: show_on_model_ui,
            employee_selected_employee_ui: false,
          };
          this.subordinateAvatorList.push(this.subordinateAvatorArryFilters);
        });

        console.log('supv-portal-employee-filter-service -> this.subordinateAvatorList', this.subordinateAvatorList);
        return this.subordinateAvatorList;
      },
        catchError((error: any) => {
          console.log('supv-portal-employee-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // GET   /v1​/employee​/subordinates
  getSupvPortalSubordinateBulkFilter(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    // const params = `?employee_id=${employeeId}`;
    let params = '';

    if (this.logged_in_user.employee_id === '1222' && environment.production == false) {
      // params = `?employee_id=${331}`;
      // params = `?employee_id=${237}`;  // Asif
      params = `?employee_id=${347}`;  // Misru
    } else if (this.logged_in_user.employee_id === '1203' && environment.production == false) {
      params = `?employee_id=${1078}`;
      // params = `?employee_id=${331}`;
    } else {
      params = `?employee_id=${employeeId}`;
    }

    return this._http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/subordinates` + params, httpOptions)
      .pipe(map((res: any) => {
        this.subordinateBulkList = [];
        res.forEach((ele, index) => {
          this.subordinateBulkArryFilters = [];
          let show_on_filter_avatar_ui = false;
          let show_on_model_ui = true;
          if (index < 10) {
            show_on_filter_avatar_ui = true;
            show_on_model_ui = false;
          } else {
            show_on_filter_avatar_ui = false;
            show_on_model_ui = true;
          }
          this.subordinateBulkArryFilters = {
            employee_city: ele.employee_city,
            employee_department: ele.employee_department,
            employee_designation: ele.employee_designation,
            employee_division: ele.employee_division,
            employee_division_manager: ele.employee_division_manager,
            employee_domain_id: ele.employee_domain_id,
            employee_email: ele.employee_email,
            employee_ext_number: ele.employee_ext_number,
            employee_id: ele.employee_id,
            employee_last_known_location: ele.employee_last_known_location,
            employee_mobile_number: ele.employee_mobile_number,
            employee_name: ele.employee_name,
            employee_name_with_id: ele.employee_name_with_id,
            employee_office_location: ele.employee_office_location,
            employee_picture_path: ele.employee_picture_path,
            employee_section: ele.employee_section,
            employee_status: ele.employee_status,
            employee_work_anniversary: ele.employee_work_anniversary,
            employee_http_error_status: '',
            employee_http_error_message: '',
            employee_http_error_model_state: '',
            employee_checkbox_ui: false,
          };
          this.subordinateBulkList.push(this.subordinateBulkArryFilters);
        });

        console.log('supv-portal-employee-filter-service -> this.subordinateBulkList', this.subordinateBulkList);
        return this.subordinateBulkList;
      },
        catchError((error: any) => {
          console.log('supv-portal-employee-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
