import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// Env
import { environment } from 'src/environments/environment';
// import { Adal8HTTPService, Adal8Service, Adal8Interceptor } from 'adal-angular8';
// Core - Service
import { GlobalBaseService } from './global-base.service';
import { CoreGlobalBaseService } from './core-global-base.service';
// Storage
import { LocalStorageService } from './../local-storage/local-storage.service';
// Service
// import { StaffPortalSwitchProfileService } from '../../../orchestra/staff-portal/services/staff-portal-switch-profile.service';

@Injectable({
  providedIn: 'root'
})
export class UiBaseService {

  public appConfig: any = [];

  tempProfile: any = [];
  tempProfilePicture: any = [];
  tempProfilePicturePath: any;

  public myProfile: any = [];
  public myProfilePicture: any = [];
  public myProfilePicturePath: any = [];
  public displayProfileName: any = [];
  public displayProfilePicture: any = [];
  public displayProfilePicturePath: any = [];

  public myPeers: any = [];
  public mySubordinates: any = [];

  constructor(
    private _cookieService: CookieService,
    private _router: Router,
    private _localStorageService: LocalStorageService, public sanitizer: DomSanitizer, private http: HttpClient,
    private globalBase: GlobalBaseService, private coreGlobalBase: CoreGlobalBaseService,
    // private switchProfileService: StaffPortalSwitchProfileService
    ) {
    this.appConfig = [
      {
        appEnviroment: [], appAccessList: [], uiConfig: [], myProfileInfo: [{ myProfile: {}, myProfilePicture: {}, displayName: {}, displayPicture: {}, myPeers: [], mySubordinates: [] }]
      },
    ];

    if (this.appConfig) {
      this.appConfig.forEach(ele => {
        if (ele) {
          ele.appAccessList = [
            { appName: 'Root', accessType: 'Admin', activeInLive: false, activeInDemo: true, activeInDev: true },
            { appName: 'Admin Console', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
            { appName: 'e-service', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
            { appName: 'finance', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
            { appName: 'hr', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
            { appName: 'lms', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
            { appName: 'nfc', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
            { appName: 'hr', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
            { appName: 'online-application', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
            { appName: 'staff-portal', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
          ];
        }
      });
    }
  }


  public getAppConfigData() {
    this.getMyProfile().then(data => {
      return new Promise(resolve => {
        const dataPromise = this.getMyPeers();
        const adalConfig = this.getMySubordinates();
        resolve(dataPromise);
      });
    });
    return this.appConfig;
  }


  public getMyProfile() {
    console.log('ui-base-service - getMyProfile -> ::');

    //let token = JSON.parse(this._cookieService.get('yodaCoreApiToken'));
    return new Promise(resolve => {
      this.coreGlobalBase.getStaffPortalMyDetails().subscribe((data: any) => {
        console.log('ui-base-service - getMyProfile -> data ::', data);
        console.log('getMyProfile - ', data);
        this.tempProfile = [];
        this.tempProfilePicture = [];
        this.tempProfilePicturePath = [];
        this.tempProfile = data;
        this.tempProfilePicturePath = data.employee_picture_path;

        this.coreGlobalBase.getStaffPortalEmployeePictureByEmployeeId(data.employee_id).subscribe(base64 => {
          const reader = new FileReader();
          reader.readAsDataURL(base64);
          reader.onload = () => {
            let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
            if ((encoded.length % 4) > 0) {
              encoded += '='.repeat(4 - (encoded.length % 4));
            }
            this.tempProfilePicture = base64;
          };

          const tempEmployeeId = 'ProfilePicture' + data.Id;
          this._localStorageService.setLocalStorageBase64(tempEmployeeId, this.tempProfilePicture);

          if (this.tempProfile) {
            this.myProfile = this.tempProfile;
            this._localStorageService.setLocalStorage('myProfile', JSON.stringify(this.tempProfile));
            // this.switchProfileService.getProfileList();
          }
          if (this.tempProfilePicture) {
            this.myProfilePicture = this.tempProfilePicture;
            this._localStorageService.setLocalStorage('myProfilePicture', this.tempProfilePicture);
          }
          if (this.tempProfilePicturePath) {
            this.myProfilePicturePath = this.tempProfilePicturePath;
            this._localStorageService.setLocalStorage('myProfilePicturePath', this.myProfilePicturePath);
          }
          if (data.employee_id === '1222') {
            this.http.get('/assets/img/theme/profile-suoodh.jpg', { responseType: 'blob' }).subscribe(res => {
              const reader = new FileReader();
              reader.readAsDataURL(res);
              reader.onload = () => {
                let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
                if ((encoded.length % 4) > 0) {
                  encoded += '='.repeat(4 - (encoded.length % 4));
                }
                this.displayProfilePicture = encoded;
              };
            });
            if (this.displayProfileName) {
              this.displayProfileName = 'Suoodh';
              this._localStorageService.setLocalStorage('displayName', JSON.stringify(this.displayProfileName));
            }
            if (this.displayProfilePicture) {
              this._localStorageService.setLocalStorage('displayPicture', this.displayProfilePicture);
            }
            if (this.displayProfilePicturePath) {
              this.displayProfilePicturePath = '../../assets/img/theme/profile-suoodh.jpg';
              this._localStorageService.setLocalStorage('displayProfilePicturePath', this.displayProfilePicturePath)
            }
            resolve(this.displayProfileName);
          } else {
            if (this.displayProfileName) {
              this.displayProfileName = data.employee_name;
              this._localStorageService.setLocalStorage('displayName', JSON.stringify(this.displayProfileName));
            }
            if (this.displayProfilePicture) {
              this.displayProfilePicture = data;
              this._localStorageService.setLocalStorage('displayPicture', this.displayProfilePicture);
            }
            if (this.displayProfilePicturePath) {
              this.displayProfilePicturePath = this.tempProfilePicturePath;
              this._localStorageService.setLocalStorage('displayProfilePicturePath', this.displayProfilePicturePath)
            }
            this._router.navigate(['/general/my-calendar']);
            resolve(this.displayProfileName);
          }
        });
      });
      console.log('ui-base -> this.myProfilePicturePath ', this.myProfilePicturePath);
      console.log('ui-base -> this.displayProfilePicturePath ', this.displayProfilePicturePath);
    });
  }


  public getMyPeers() {
    return new Promise(resolve => {
      if (this.myProfile) {
        this.globalBase.getMyPeersDetails(this.myProfile.employee_id).subscribe(data => {
          data.forEach(ele => {
            this.tempProfile = [];
            this.tempProfilePicture = [];
            this.globalBase.getMyProfilePictureBase64(ele.Id).subscribe((base64: string) => {
              this.tempProfilePicture = base64;
              this.tempProfile = ele;
              const profile = {
                profile: this.tempProfile,
                profilePicture: this.tempProfilePicture,
              };
              this.myPeers.push(profile);
            });
          });
          localStorage.setItem('myPeers', JSON.stringify(this.myPeers));
          resolve(this.myPeers);
        });
      }
    });
  }


  public getMySubordinates() {
    return new Promise(resolve => {
      // if (this.myProfile) {
      //   this.globalBase.getMySubordinatesDetails(this.myProfile.employee_id).subscribe(data => {
      //     // console.log('uiBase => getMySubordinates', data);
      //     if (data.length > 0) {
      //       data.forEach(ele => {
      //         this.tempProfile = [];
      //         this.tempProfilePicture = [];
      //         this.globalBase.getMyProfilePictureBase64(ele.Id).subscribe((base64: string) => {
      //           // this.tempProfilePicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64);
      //           this.tempProfilePicture = base64;
      //           this.tempProfile = ele;
      //           const profile = {
      //             profile: this.tempProfile,
      //             profilePicture: this.tempProfilePicture,
      //           };
      //           this.mySubordinates.push(profile);
      //         });
      //       });
      //     }
      //     localStorage.setItem('mySubordinates', JSON.stringify(this.mySubordinates));
      //     this._cookieService.set('mySubordinates', JSON.stringify(this.mySubordinates));
      //     resolve(this.mySubordinates);
      //   });
      // }
    });
  }


  // public getDisplayProfile() {
  //   return new Promise(resolve => {
  //     // console.log('uiBase => getDisplayProfile', this.appConfig);
  //     // console.log('uiBase => getDisplayProfile', this.appConfig[0].myProfileInfo[0].displayName);
  //     // console.log('uiBase => getDisplayProfile', this.appConfig[0].myProfileInfo[0].displayPicture);
  //     this.appConfig.forEach(ele => {

  //       if (ele) {
  //         console.log('uiBase => getDisplayProfile, appConfig', ele);
  //         ele.myProfileInfo.forEach(element => {
  //           if (element) {
  //             console.log('uiBase => getDisplayProfile, myProfileInfo', element);
  //             console.log('uiBase => getDisplayProfile, myProfileInfo', element[0].myProfile);
  //             // this.displayProfile.Name = eleMyProfileInfo.displayName;
  //             // this.displayProfile.Picture = eleMyProfileInfo.displayPicture;
  //             console.log('uiBase => getDisplayProfile, myProfileInfo', element.myProfile);
  //             console.log('uiBase => getDisplayProfile, myProfileInfo', element.myProfilePicture);
  //             console.log('uiBase => getDisplayProfile, displayName', element.displayName);
  //             console.log('uiBase => getDisplayProfile, displayPicture', element.displayPicture);

  //             this.displayProfile.Name = element.displayName;
  //             this.displayProfile.Picture = element.displayPicture;

  //             console.log('uiBase => getDisplayProfile, displayProfile.Name', this.displayProfile.Name);
  //             console.log('uiBase => getDisplayProfile, displayProfile.Picture', this.displayProfile.Picture);

  //             resolve(this.displayProfile);
  //             console.log('uiBase => getDisplayProfile, displayProfile', this.displayProfile);
  //           }
  //         });
  //       }
  //     });
  //   });
  // }
}
