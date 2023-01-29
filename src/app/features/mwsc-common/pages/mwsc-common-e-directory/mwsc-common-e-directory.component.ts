import { Component, OnInit } from '@angular/core';
import { MwscCommonBaseService } from './../../shared/services/mwsc-common-base.service';
import { MwscCommonEmployeeBaseService } from './../../shared/services/mwsc-common-employee-base.service';
import { LocalStorageService } from './../../../../../app/core/services/local-storage/local-storage.service';
import { environment } from './../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
declare var $: any;


@Component({
  selector: 'app-mwsc-common-e-directory',
  templateUrl: './mwsc-common-e-directory.component.html',
  styleUrls: ['./mwsc-common-e-directory.component.scss']
})
export class MwscCommonEDirectoryComponent implements OnInit {

  showLoader: boolean;
  requestList: any = [];
  searchValue: string;

  tempProfile: any = [];
  tempProfilePicture: any = [];
  // Error Handling
  model_state_error: any;
  general_api_error: any;

  constructor(
    private mwscCommonEmployeeBase: MwscCommonEmployeeBaseService,
    private mwscCommonBase: MwscCommonBaseService,
    private localStorageBase: LocalStorageService,
    public sanitizer: DomSanitizer) {
    this.requestList = [];
    this.showLoader = false;
  }

  ngOnInit() {
  }


  // First Page Data from Server
  search(searchtext) {
    console.log('getRequestForPageOneOnly data');
    this.showLoader = true;
    this.requestList = [];
    let medicalLeaveId: any = "9001";
    this.mwscCommonEmployeeBase.getMwscCommonEmployeeSearch(this.searchValue).subscribe((data: any) => {
      console.log('requestList data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      this.requestList = data;
      this.showLoader = false;
    }, (error: Response | any) => {
      console.log('getRequestForPageOneOnly -> error', error);
      if (error.status === 400) {
        this.general_api_error = error.error.error_message;
        this.model_state_error = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.general_api_error = 'Authorization Error! You are not authorized to view this page';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.general_api_error = 'Oh snap! Unknown error Occurred';
      } else {
        console.log('error other', error);
        this.general_api_error = error.error.error_message;
      }
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  xsearch(searchtext) {
    this.showLoader = true;

    if (environment.staffAppApiConfig.api_json_server === true) {
      // Json Server
      this.mwscCommonBase.getEmployeeSearch(
        {
          searchValue: searchtext,
        }
      ).subscribe(data => {
        console.log('search-Search', data);
        data.forEach(ele => {
          if (ele) {
            this.tempProfile = []; this.tempProfilePicture = [];
            this.tempProfilePicture = null; this.tempProfile = ele;
            const profile = {
              profile: this.tempProfile,
              profilePicture: this.tempProfilePicture,
            };
            this.requestList.push(profile);
          }
        });
        if (this.requestList.length > 1) {
          // Update
          var notify = $.notify('<strong>Success</strong> ' + this.requestList.length + ' Search Result Found.', { allow_dismiss: false });
          notify.update({ type: 'success', title: 'Success', newest_on_top: false, position: 'fixed', from: 'bottom', align: 'right', notify });
        } else {
          // Update Progress bar
          var notify = $.notify('<strong>Warning</strong> No Search result Found.', { allow_dismiss: false });
          notify.update({ type: 'warning', title: 'Warning', placement: { from: 'bottom', align: 'right' }, notify, progress: 30 });
        }
        console.log('requestList requestList', this.requestList);
        this.showLoader = false;
      }, (error: Response | any) => {
        this.showLoader = false;
        return throwError(new Error(error.status));
      });

    } else {
      // Live & Dev Server
      this.mwscCommonBase.getEmployeeSearch(
        {
          searchValue: searchtext,
        }
      ).subscribe(data => {
        data.forEach(ele => {
          if (ele) {
            this.tempProfile = []; this.tempProfilePicture = [];
            const employeeId = 'ProfilePicture' + ele.Employee.Id;
            const localStorageMyProfile = this.localStorageBase.getLocalStorageBase64(employeeId);
            if (localStorageMyProfile == null) {
              // Get from Picture from API
              this.mwscCommonBase.getMyProfilePictureBase64(ele.Id).subscribe((base64: string) => {
                this.tempProfilePicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64);
                this.tempProfile = ele;
                // Set Picture to LocalStorage
                const tempEmployeeId = 'ProfilePicture' + ele.Employee.Id;
                this.localStorageBase.setLocalStorageBase64(tempEmployeeId, this.tempProfilePicture);

                const profile = {
                  profile: this.tempProfile,
                  profilePicture: this.tempProfilePicture,
                };
                this.requestList.push(profile);
              });
            } else {
              // Get from Picture from LocalStorage
              this.tempProfilePicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + localStorageMyProfile);
              this.tempProfile = ele;
              const profile = {
                profile: this.tempProfile,
                profilePicture: this.tempProfilePicture,
              };
              this.requestList.push(profile);
            }
          }
        });

        if (this.requestList.length > 1) {
          // Update
          var notify = $.notify('<strong>Success</strong> ' + this.requestList.length + ' Search Result Found.', { allow_dismiss: false });
          notify.update({ type: 'success', title: 'Success', newest_on_top: false, position: 'fixed', from: 'bottom', align: 'right', notify });
        } else {
          // Update Progress bar
          var notify = $.notify('<strong>Warning</strong> No Search result Found.', { allow_dismiss: false });
          notify.update({ type: 'warning', title: 'Warning', placement: { from: 'bottom', align: 'right' }, notify, progress: 30 });
        }
        console.log('requestList requestList', this.requestList);
        this.showLoader = false;
      }, (error: Response | any) => {
        this.showLoader = false;
        return throwError(new Error(error.status));
      });
    }
  }


}
