import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
// Env
import { environment } from './../../../../environments/environment';
// Storage
import { LocalStorageService } from './../local-storage/local-storage.service';
// Services
import { ApiBaseService } from './../api-related/api-base.service';
import { YodaCoreApiBaseService } from './../api-related/yoda-core-api-base.service';
import { HttpHeaderService } from './../token/http-header.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalBaseService {

  constructor(
    private _cookieService: CookieService,
    private _localStorageService: LocalStorageService,
    private apiBase: ApiBaseService,
    // private yodaCoreApiBase: YodaCoreApiBaseService,
    private _httpHeaderService: HttpHeaderService,
    private http: HttpClient,
    private sanitizer: DomSanitizer) {
  }


  // GET My/Details
  getMyProfileDetails() {
    return this.apiBase.get('My/Details');
  }

  // GET Employee/{Id}/Picture/Base64
  getMyProfilePictureBase64(employeeId) {
    return this.apiBase.get('Employee/' + employeeId + '/Picture/Base64');
  }

  // GET Employee/{Id}/Peers
  getMyPeersDetails(employeeId) {
    return this.apiBase.get('Employee/' + employeeId + '/Peers');
  }

  // GET Employee/{Id}/Subordinates
  getMySubordinatesDetails(employeeId) {
    return this.apiBase.get('Employee/' + employeeId + '/Subordinates');
  }


  getLocalStorageData(dataKeyName) {
    return new Promise(resolve => {
      const localStorageData = localStorage.getItem(dataKeyName);
      if (localStorageData !== null) {
        console.log('setLocalStorageData :::>> Success !!! Data was get Successfully', localStorageData);
        resolve(localStorageData);
      } else {
        console.log('setLocalStorageData :::>> Error occurred while getting the Data', localStorageData);
      }
    });
  }


  setLocalStorageData(dataToStore, dataKeyName) {
    return new Promise(resolve => {
      // const localStorageData = localStorage.setItem(dataKeyName, (dataToStore));
      const localStorageData = this._cookieService.set(dataKeyName, JSON.stringify(dataToStore));

      if (localStorageData !== null) {
        console.log('setLocalStorageData :::>> Success !!! Data was set Successfully', localStorageData);
        resolve(localStorageData);
      } else {
        console.log('setLocalStorageData :::>> Error occurred while setting the Data', localStorageData);
      }
    });
  }

  // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/full-details?employee_id=1222
  // GET   /v1/employee/full-details
  // myProfile
  getEmployeeMyprofile(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}`;
    return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/full-deatils` + params, httpOptions)
      .pipe(map(res => {
        // this.leaveRequestsSubject.next(res);
        console.log('employee-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('employee-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  // GET   /v1/employee / subordinates
  // subordinatesList
  getEmployeeMySubordinates(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}`;
    return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/subordinates` + params, httpOptions)
      .pipe(map(res => {
        this._localStorageService.setLocalStorage('subordinatesList', JSON.stringify(res))
        // this.leaveRequestsSubject.next(res);
        console.log('employee-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('employee-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // GET   / v1 / employee / peers
  // peersList
  // GET   /v1​/employee​/peers
  getEmployeeMyPeers(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}`;
    return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/peers` + params, httpOptions)
      .pipe(map(res => {
        this._localStorageService.setLocalStorage('peersList', JSON.stringify(res));
        // this.leaveRequestsSubject.next(res);
        console.log('employee-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('employee-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  // GET   /v1/employee/team-members
  // teamMembersList
  getEmployeeMyTeamMembers(employeeId) {
    const httpOptions = this._httpHeaderService.prepareOptions();
    const params = `?employee_id=${employeeId}`;
    return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/team-members` + params, httpOptions)
      .pipe(map(res => {
        localStorage.setItem('teamMembersList', JSON.stringify(res));

        const cookieExists: boolean = this._cookieService.check('teamMembersList');
        if (cookieExists) {
          this._cookieService.delete('teamMembersList');
          this._cookieService.set('teamMembersList', JSON.stringify(res));
        } else {
          this._cookieService.set('teamMembersList', JSON.stringify(res));
        }

        // this.leaveRequestsSubject.next(res);
        console.log('employee-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('employee-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
