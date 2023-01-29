import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// Env
import { environment } from "../../../../environments/environment";
// Ui Config
import { UiConfigService } from './../../../core/services/ui-config/ui-config.service';

var menuAccess: any = environment.appConfig.staffPortal.sideMenu;

var misc: any = {
  sidebar_mini_active: true
};

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  isVisible?: boolean;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
  isVisible?: boolean;
}

export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}

//  Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard", title: "DASHBOARDS", type: "sub", icontype: "fa-chart-area text-primary", collapse: "tables", isCollapsed: true, isVisible: menuAccess.general,
    children: [
      { path: "my-dashboard", title: "My Dashboard", type: "link", isVisible: menuAccess.general_letter },
      { path: "leave-management", title: "Leave Management (*)", type: "link", isVisible: menuAccess.general_letter },
      { path: "overtime-management", title: "OT Management (*)", type: "link", isVisible: menuAccess.general_letter },
    ]
  },
  {
    path: "/general", title: "General", type: "sub", icontype: "fa-file-alt text-primary", collapse: "tables", isCollapsed: true, isVisible: menuAccess.general,
    children: [
      { path: "my-calendar", title: "My Calendar", type: "link", isVisible: menuAccess.general_letter },
      { path: "my-letters", title: "My Statistics", type: "link", isVisible: menuAccess.general_holiday },
      { path: "my-payslips", title: "My Pay Slips", type: "link", isVisible: menuAccess.general_letter },
      { path: "my-statistics", title: "My Letters", type: "link", isVisible: menuAccess.general_holiday },
      { path: "my-subordinates", title: "My Subordinates", type: "link", isVisible: menuAccess.authorization_dashboard },
      { path: "subordinate-calendar", title: "Subordinate's Calendar (*)", type: "link", isVisible: menuAccess.authorization_dashboard },
      { path: "subordinate-statistics", title: "Subordinate's Statistics (*)", type: "link", isVisible: menuAccess.authorization_dashboard },
    ]
  },
  {
    path: "/overtime", title: "Overtime Requests", type: "sub", icontype: "fa-user-clock text-primary", collapse: "tables", isCollapsed: true, isVisible: menuAccess.authorization,
    children: [
      { path: "my-overtime-prior-approvals", title: "My Prior Approvals", type: "link", isVisible: menuAccess.authorization_dashboard },
      { path: "my-overtimes", title: "My Overtime", type: "link", isVisible: menuAccess.authorization_dashboard },
      { path: "subordinate-overtime-prior-approvals", title: "Prior Approvals Onbehalf (*)", type: "link", isVisible: menuAccess.authorization_dashboard },
      { path: "subordinate-overtimes", title: "Overtime Onbehalf (*)", type: "link", isVisible: menuAccess.authorization_dashboard },
    ]
  },
  {
    path: "/leave", title: "Leave Requests", type: "sub", icontype: "fa-plane text-primary", collapse: "tables", isCollapsed: true, isVisible: menuAccess.authorization,
    children: [
      { path: "my-leaves", title: "My Leave", type: "link", isVisible: menuAccess.authorization_dashboard },
      { path: "my-work-handovers", title: "My Work Handovers", type: "link", isVisible: menuAccess.authorization_dashboard },
      { path: "subordinate-leaves", title: "Leaves Onbehalf (*)", type: "link", isVisible: menuAccess.authorization_dashboard },
    ]
  },
  {
    path: "/approval", title: "Approval Requests", type: "sub", icontype: "fa-check text-primary", collapse: "tables", isCollapsed: true, isVisible: menuAccess.authorization,
    children: [
      { path: "pending-work-handover-approvals", title: "Pending Work Handover", type: "link", isVisible: menuAccess.authorization_dashboard },
      { path: "pending-overtime-prior-approvals", title: "Pending Prior Approvals", type: "link", isVisible: menuAccess.authorization_dashboard },
      { path: "pending-overtime-approvals", title: "Pending Overtime Approvals", type: "link", isVisible: menuAccess.authorization_dashboard },
      { path: "pending-leave-approvals", title: "Pending Leave Approvals", type: "link", isVisible: menuAccess.authorization_dashboard },
    ]
  },
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuAccess: any = environment.appConfig.staffPortal.sideMenu;
  public menuItems: any[];
  public isCollapsed = true;

  portal: any = { name: 'Staff Portal', supervisor_access: true }

  constructor(private _uiConfigService: UiConfigService, private router: Router) {
    let viewtype = this._uiConfigService.geUiSidebarFromStorage('ui-sidebar-type');
    this.portal.name = viewtype;
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
  }


  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }


  onMouseLeaveSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }


  minimizeSidebar() {
    const sidenavToggler = document.getElementsByClassName(
      "sidenav-toggler"
    )[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }


  changePortal() {
    console.log('changePortal', this.portal.name);
    if (this.portal.name === 'Staff Portal' && this.portal.supervisor_access) {
      this._uiConfigService.setUiSidebarFromStorage('ui-sidebar-type', 'Supervisor Portal');
      this.portal.name = 'Supervisor Portal';
    } else {
      this._uiConfigService.setUiSidebarFromStorage('ui-sidebar-type', 'Staff Portal');
      this.portal.name = 'Staff Portal'
    }
    console.log('changePortal', this.portal.name);
  }

  feedback() {
    const url = 'https://forms.office.com/pages/responsepage.aspx?id=YTVbMha1CkWv9OBJKCQLh4xZWs0jrfpOp0zCySDhizZUOFpJSENCWTJYNVdRQk9RQjRDTVY2VzlSUy4u';
    window.open(url, '_blank');
  }
}
