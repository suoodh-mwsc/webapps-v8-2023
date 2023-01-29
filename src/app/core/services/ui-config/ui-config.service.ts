import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject, throwError, Subscriber, Subject, interval, Subscription, of } from 'rxjs';

const UI_CONFIG = 'ui-config';

const UI_SIDEBAR_TYPE = 'ui-sidebar-type';

const UI_VIEW_PAYSLIP = 'ui-view-payslip';
const UI_VIEW_LETTER = 'ui-view-letter';
const UI_VIEW_PRIOR_APPROVAL = 'ui-view-prior-approval';
const UI_VIEW_OVERTIME = 'ui-view-overtime';
const UI_VIEW_LEAVE = 'ui-view-leave';
const UI_VIEW_HANDOVER = 'ui-view-handover';
const UI_VIEW_PENDING_HANDOVER = 'ui-view-pending-handover';
const UI_VIEW_PENDING_PRIOR_APPROVAL = 'ui-view-pending-prior-approval';
const UI_VIEW_PENDING_OVERTIME = 'ui-view-pending-overtime';
const UI_VIEW_PENDING_LEAVE = 'ui-view-pending-leave';

const UI_VIEW_SUPV_SUBORDINATE = 'ui-view-supv-subordinate';
const UI_VIEW_SUPV_PRIOR_APPROVAL = 'ui-view-supv-prior-approval';
const UI_VIEW_SUPV_OVERTIME = 'ui-view-supv-overtime';
const UI_VIEW_SUPV_LEAVE = 'ui-view-supv-leave';

const UI_VIEW_AVATAR_HANDOVER = 'ui-view-avatar-handover';
const UI_VIEW_AVATAR_PENDING_HANDOVER = 'ui-view-avatar-pending-handover';
const UI_VIEW_AVATAR_PENDING_PRIOR_APPROVAL = 'ui-view-avatar-pending-prior-approval';
const UI_VIEW_AVATAR_PENDING_OVERTIME = 'ui-view-avatar-pending-overtime';
const UI_VIEW_AVATAR_PENDING_LEAVE = 'ui-view-avatar-pending-leave';


@Injectable({
  providedIn: 'root'
})
export class UiConfigService {

  last_known_config: any = {
    staff_portal: {
      payslip: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
      letter: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
      prior_approval: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
      overtime: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
      leave: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
      work_handover: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
      pending_work_handover: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
      pending_prior_approval: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
      pending_overtime: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
      pending_leave: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
    },
    supervisor_portal: {
      prior_approval: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
      overtime: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
      leave: { last_page_visited: 1, view_type: 'card', auto_send_for_approval: true, show_avatar: true },
    },
  };

  // Yoda Core - User
  private uiConfigSubject$: BehaviorSubject<any> = new BehaviorSubject(null);
  public uiConfig: Observable<any>;

  constructor(
    private _cookieService: CookieService) {
    this.uiConfigSubject$ = new BehaviorSubject<any>(this.getUiConfig());
    this.uiConfig = this.uiConfigSubject$.asObservable();
  }

  public saveUiConfig(uiConfigData) {
    this._cookieService.delete(UI_CONFIG);
    this._cookieService.set(UI_CONFIG, JSON.stringify(uiConfigData));
  }

  public getUiConfig(): any | null {
    let uiConfig = this._cookieService.get(UI_CONFIG);
    try {
      return JSON.parse(uiConfig);
    } catch (error) {
      return null;
    }
  }


  public updateUiConfigView(dataToUpdate, ViewType) {
    // var persons = JSON.parse(localStorage.persons);
    // for (var i = 0; i < persons.length; i++) {
    //   if (inputName === persons[i].name) {  //look for match with name
    //     persons[i].age += 2;  //add two
    //     break;  //exit loop since you found the person
    //   }
    // }
    // localStorage.setItem("persons", JSON.stringify(persons));  //put the object back

    let uiConfig = this._cookieService.get(UI_CONFIG);
    let uiConfigJsonParse = JSON.parse(uiConfig);

    uiConfigJsonParse.forEach(ele => {
      if (ele.id === dataToUpdate.id) {
        ele.view_type = ViewType;
        if (ele.avatar_settings) {
          if (dataToUpdate.show_avatar === true && ele.show_avatar === true) {
          } else if (dataToUpdate.show_avatar === false && ele.show_avatar === false) {
          } else {
            ele.show_avatar = dataToUpdate.show_avatar;
          }
        }
      }
    });

    this.saveUiConfig(uiConfigJsonParse);
    this.setUiConfigData(uiConfigJsonParse);
  }


  public updateUiConfigAvatar(dataToUpdate, Avatar) {
    let uiConfig = this._cookieService.get(UI_CONFIG);
    let uiConfigJsonParse = JSON.parse(uiConfig);

    uiConfigJsonParse.forEach(ele => {
      if (ele.id === dataToUpdate.id) {
        ele.show_avatar = Avatar;
      }
    });

    this.saveUiConfig(uiConfigJsonParse);
    this.setUiConfigData(uiConfigJsonParse);
  }


  public getUiConfigData(): Observable<any> {
    return this.uiConfigSubject$.asObservable();
  }

  public setUiConfigData(configData: any) {
    this.uiConfigSubject$.next(configData);
  }



  public getUiConfigDataFromStorage(module_name: any) {
    if (module_name === 'ui-view-payslip') {
      const cookieExists: boolean = this._cookieService.check('ui-view-payslip');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_PAYSLIP);
      } else {
        return 'card';
      }
    }

    if (module_name === 'ui-view-letter') {
      const cookieExists: boolean = this._cookieService.check('ui-view-letter');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_LETTER);
      } else {
        return 'card';
      }
    }
    if (module_name === 'ui-view-prior-approval') {
      const cookieExists: boolean = this._cookieService.check('ui-view-prior-approval');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_PRIOR_APPROVAL);
      } else {
        return 'card';
      }
    }

    if (module_name === 'ui-view-overtime') {

      const cookieExists: boolean = this._cookieService.check('ui-view-overtime');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_OVERTIME);
      } else {
        return 'card';
      }
    }

    if (module_name === 'ui-view-leave') {
      const cookieExists: boolean = this._cookieService.check('ui-view-leave');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_LEAVE);
      } else {
        return 'card';
      }
    }

    if (module_name === 'ui-view-handover') {
      const cookieExists: boolean = this._cookieService.check('ui-view-handover');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_HANDOVER);
      } else {
        return 'card';
      }
    }

    if (module_name === 'ui-view-pending-handover') {
      const cookieExists: boolean = this._cookieService.check('ui-view-pending-handover');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_PENDING_HANDOVER);
      } else {
        return 'card';
      }
    }

    if (module_name === 'ui-view-pending-prior-approval') {
      const cookieExists: boolean = this._cookieService.check('ui-view-pending-prior-approval');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_PENDING_PRIOR_APPROVAL);
      } else {
        return 'card';
      }
    }

    if (module_name === 'ui-view-pending-overtime') {
      const cookieExists: boolean = this._cookieService.check('ui-view-pending-overtime');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_PENDING_OVERTIME);
      } else {
        return 'card';
      }
    }

    if (module_name === 'ui-view-pending-leave') {
      const cookieExists: boolean = this._cookieService.check('ui-view-pending-leave');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_PENDING_LEAVE);
      } else {
        return 'card';
      }
    }


    if (module_name === 'ui-view-supv-subordinate') {
      const cookieExists: boolean = this._cookieService.check('ui-view-supv-subordinate');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_SUPV_SUBORDINATE);
      } else {
        return 'card';
      }
    }

    if (module_name === 'ui-view-supv-prior-approval') {
      const cookieExists: boolean = this._cookieService.check('ui-view-supv-prior-approval');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_SUPV_PRIOR_APPROVAL);
      } else {
        return 'card';
      }
    }

    if (module_name === 'ui-view-supv-overtime') {
      const cookieExists: boolean = this._cookieService.check('ui-view-supv-overtime');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_SUPV_OVERTIME);
      } else {
        return 'card';
      }
    }

    if (module_name === 'ui-view-supv-leave') {
      const cookieExists: boolean = this._cookieService.check('ui-view-supv-leave');
      if (cookieExists === true) {
        return this._cookieService.get(UI_VIEW_SUPV_LEAVE);
      } else {
        return 'card';
      }
    }

  }


  public setUiConfigDataFromStorage(module_name: any, data) {
    if (module_name === 'ui-view-payslip') {
      this._cookieService.delete(UI_VIEW_PAYSLIP);
      this._cookieService.set(UI_VIEW_PAYSLIP, data);
    }
    if (module_name === 'ui-view-letter') {
      this._cookieService.delete(UI_VIEW_LETTER);
      this._cookieService.set(UI_VIEW_LETTER, data);
    }
    if (module_name === 'ui-view-prior-approval') {
      this._cookieService.delete(UI_VIEW_PRIOR_APPROVAL);
      this._cookieService.set(UI_VIEW_PRIOR_APPROVAL, data);
    }
    if (module_name === 'ui-view-overtime') {
      this._cookieService.delete(UI_VIEW_OVERTIME);
      this._cookieService.set(UI_VIEW_OVERTIME, data);
    }
    if (module_name === 'ui-view-leave') {
      this._cookieService.delete(UI_VIEW_LEAVE);
      this._cookieService.set(UI_VIEW_LEAVE, data);
    }
    if (module_name === 'ui-view-handover') {
      this._cookieService.delete(UI_VIEW_HANDOVER);
      this._cookieService.set(UI_VIEW_HANDOVER, data);
    }
    if (module_name === 'ui-view-pending-handover') {
      this._cookieService.delete(UI_VIEW_PENDING_HANDOVER);
      this._cookieService.set(UI_VIEW_PENDING_HANDOVER, data);
    }
    if (module_name === 'ui-view-pending-prior-approval') {
      this._cookieService.delete(UI_VIEW_PENDING_PRIOR_APPROVAL);
      this._cookieService.set(UI_VIEW_PENDING_PRIOR_APPROVAL, data);
    }
    if (module_name === 'ui-view-pending-overtime') {
      this._cookieService.delete(UI_VIEW_PENDING_OVERTIME);
      this._cookieService.set(UI_VIEW_PENDING_OVERTIME, data);
    }
    if (module_name === 'ui-view-pending-leave') {
      this._cookieService.delete(UI_VIEW_PENDING_LEAVE);
      this._cookieService.set(UI_VIEW_PENDING_LEAVE, data);
    }
    if (module_name === 'ui-view-supv-subordinate') {
      this._cookieService.delete(UI_VIEW_SUPV_SUBORDINATE);
      this._cookieService.set(UI_VIEW_SUPV_SUBORDINATE, data);
    }
    if (module_name === 'ui-view-supv-prior-approval') {
      this._cookieService.delete(UI_VIEW_SUPV_PRIOR_APPROVAL);
      this._cookieService.set(UI_VIEW_SUPV_PRIOR_APPROVAL, data);
    }
    if (module_name === 'ui-view-supv-overtime') {
      this._cookieService.delete(UI_VIEW_SUPV_OVERTIME);
      this._cookieService.set(UI_VIEW_SUPV_OVERTIME, data);
    }
    if (module_name === 'ui-view-supv-leave') {
      this._cookieService.delete(UI_VIEW_SUPV_LEAVE);
      this._cookieService.set(UI_VIEW_SUPV_LEAVE, data);
    }
  }









  public getUiAvatarConfigDataFromStorage(module_name: any) {
    if (module_name === 'ui-view-handover') {
      const cookieExists: boolean = this._cookieService.check('ui-view-avatar-handover');
      if (cookieExists === true) {
        // return this._cookieService.get(UI_VIEW_AVATAR_HANDOVER);
        let avatar = this._cookieService.get(UI_VIEW_AVATAR_HANDOVER);
        if (avatar === 'true') {
          return true;
        }
        if (avatar === 'false') {
          return false;
        }
      } else {
        return false;
      }
    }

    if (module_name === 'ui-view-pending-handover') {
      const cookieExists: boolean = this._cookieService.check('ui-view-avatar-pending-handover');
      if (cookieExists === true) {
        // return this._cookieService.get(UI_VIEW_AVATAR_PENDING_HANDOVER);
        let avatar = this._cookieService.get(UI_VIEW_AVATAR_PENDING_HANDOVER);
        if (avatar === 'true') {
          return true;
        }
        if (avatar === 'false') {
          return false;
        }
      } else {
        return false;
      }
    }

    if (module_name === 'ui-view-pending-prior-approval') {
      const cookieExists: boolean = this._cookieService.check('ui-view-avatar-pending-prior-approval');
      if (cookieExists === true) {
        // return this._cookieService.get(UI_VIEW_AVATAR_PENDING_PRIOR_APPROVAL);
        let avatar = this._cookieService.get(UI_VIEW_AVATAR_PENDING_PRIOR_APPROVAL);
        if (avatar === 'true') {
          return true;
        }
        if (avatar === 'false') {
          return false;
        }
      } else {
        return false;
      }
    }

    if (module_name === 'ui-view-pending-overtime') {
      const cookieExists: boolean = this._cookieService.check('ui-view-avatar-pending-overtime');
      if (cookieExists === true) {
        // return this._cookieService.get(UI_VIEW_AVATAR_PENDING_OVERTIME);
        let avatar = this._cookieService.get(UI_VIEW_AVATAR_PENDING_OVERTIME);
        if (avatar === 'true') {
          return true;
        }
        if (avatar === 'false') {
          return false;
        }
      } else {
        return false;
      }
    }

    if (module_name === 'ui-view-pending-leave') {
      const cookieExists: boolean = this._cookieService.check('ui-view-avatar-pending-leave');
      if (cookieExists === true) {
        let avatar = this._cookieService.get(UI_VIEW_AVATAR_PENDING_LEAVE);
        if (avatar === 'true') {
          return true;
        }
        if (avatar === 'false') {
          return false;
        }
      } else {
        return false;
      }
    }
  }



  public setUiAvatarConfigDataFromStorage(module_name: any, data) {
    if (module_name === 'ui-view-handover') {
      this._cookieService.delete(UI_VIEW_AVATAR_HANDOVER);
      this._cookieService.set(UI_VIEW_AVATAR_HANDOVER, data);
    }
    if (module_name === 'ui-view-pending-handover') {
      this._cookieService.delete(UI_VIEW_AVATAR_PENDING_HANDOVER);
      this._cookieService.set(UI_VIEW_AVATAR_PENDING_HANDOVER, data);
    }
    if (module_name === 'ui-view-pending-prior-approval') {
      this._cookieService.delete(UI_VIEW_AVATAR_PENDING_PRIOR_APPROVAL);
      this._cookieService.set(UI_VIEW_AVATAR_PENDING_PRIOR_APPROVAL, data);
    }
    if (module_name === 'ui-view-pending-overtime') {
      this._cookieService.delete(UI_VIEW_AVATAR_PENDING_OVERTIME);
      this._cookieService.set(UI_VIEW_AVATAR_PENDING_OVERTIME, data);
    }
    if (module_name === 'ui-view-pending-leave') {
      this._cookieService.delete(UI_VIEW_AVATAR_PENDING_LEAVE);
      this._cookieService.set(UI_VIEW_AVATAR_PENDING_LEAVE, data);
    }
  }



  public geUiSidebarFromStorage(module_name: any) {
    if (module_name === 'ui-sidebar-type') {
      const cookieExists: boolean = this._cookieService.check('ui-sidebar-type');
      if (cookieExists === true) {
        return this._cookieService.get(UI_SIDEBAR_TYPE);
      } else {
        return 'Staff Portal';
      }
    }
  }


  public setUiSidebarFromStorage(module_name: any, data) {
    if (module_name === 'ui-sidebar-type') {
      this._cookieService.delete(UI_SIDEBAR_TYPE);
      this._cookieService.set(UI_SIDEBAR_TYPE, data);
    }
  }
}
