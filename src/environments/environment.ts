// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,
  appVersion: require('../../package.json').version + '-dev',

  staffAppApiConfig: {
    frontend_url: 'http://localhost:4200/',
    // api_url: 'https://staff-app-api-prd-01.mwsc.com.mv/',
    api_url: 'https://yoda-dev.mwsc.com.mv/',
    api_server: 'localhost',

    api_json_server_url: 'http://localhost:3001/',
    api_json_server: true,
  },

  adalConfig: {
    tenant: 'mwscnet.onmicrosoft.com',
    clientId: 'e325cce5-05cc-40c0-a528-46c4dbccff6b',
    popUp: false,
    redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1), //window.location.origin + '/',
    //redirectUri: 'https://192.168.111.78:4242/',
    postLogoutRedirectUri: 'https://login.microsoftonline.com/e325cce5-05cc-40c0-a528-46c4dbccff6b/oauth2/logout?post_logout_redirect_uri=https://localhost:4242/login',
    navigateToLoginRequestUrl: true,
  },

  appConfig: {
    appTiles: {
      eService: false,
      finance: false,
      hr: false,
      guradTour: false,
      staffPortal: true,
      supervisorPortal: true,
      emtPortal: false
    },
    staffPortal: {
      common: {
        alertTimeOut: 2000,
        toastrTimeOut: 3000,
        modelCloseTimeOut: 500,
        bulkCreatModeleCloseTimeOut: 8000,
      },
      sideMenu: {
        appSwitch: true,
        dashboard: true,
      },
      paginations: {
        leaveRequests: 10,
        medicalLeaveRequests: 10,
        overtimeRequests: 10,
        otPriorApprovalRequests: 10,
      },
      statistics: {
        modules: {
          leaveQuota: true,
          leaveDetails: true,
          unauthorizedAbsence: true,
          overtimeCalculator: true,
        },
      },
      letters: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
      },
      overtimeRequests: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          action: true,
          cancel: true,
          sendForApproval: true,
          sendForRecall: true,
          shorten: false,
          extend: false,
        }
      },
      otPriorApprovalRequests: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          action: true,
          cancel: false,
          sendForApproval: true,
          sendForRecall: false,
          shorten: false,
          extend: false,
        }
      },
      leaveRequests: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          action: true,
          cancel: true,
          sendForApproval: true,
          sendForRecall: true,
          shorten: true,
          extend: false,
        }
      },
      medicalLeaveRequests: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          action: true,
          cancel: true,
          sendForApproval: true,
          sendForRecall: true,
          shorten: false,
          extend: false,
        }
      },
      workHandoverRequests: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          action: true,
          cancel: true,
          sendForApproval: true,
        }
      },
      pendingWorkHandoverApprovals: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'card',
        buttons: {
          action: true,
          approve: true,
          reject: true,
          view: true,
        }
      },
      pendingLeaveApprovals: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'card',
        buttons: {
          action: true,
          approve: true,
          reject: true,
          view: true,
        }
      },
      pendingOtApprovals: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'card',
        buttons: {
          action: true,
          approve: true,
          reject: true,
          view: true,
        }
      },
      pendingOtPriorApprovals: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'card',
        buttons: {
          action: true,
          approve: true,
          reject: false,
          view: true,
        }
      },
    },
    supervisorPortal: {
      common: {
        alertTimeOut: 2000,
        toastrTimeOut: 3000,
        modelCloseTimeOut: 500,
        bulkCreatModeleCloseTimeOut: 10000,
      },
      sideMenu: {
        appSwitch: true,
        dashboard: true,
        dashboard_overview: false,
        dashboard_attendance: false,
        dashboard_leave: true,
        dashboard_ot: true,
      },
      overtimeRequests: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          action: true,
          reject: true,
          approval: true,
        }
      },
      otPriorApprovalRequests: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          action: true,
          reject: true,
          approval: true,
        }
      },
      leaveRequests: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          reject: true,
          approval: true,
        }
      },
      medicalLeaveRequests: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          action: true,
          reject: true,
          approval: true,
        }
      },
      pendingLeaveApprovals: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          action: true,
          cancel: true,
          approve: true,
          reject: true,
        }
      },
      pendingOtApprovals: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          action: true,
          cancel: true,
          approve: true,
          reject: true,
        }
      },
      pendingOtPriorApprovals: {
        defaultMaxPaginations: 10,
        defaultRequestView: 'List',
        buttons: {
          action: true,
          cancel: true,
          approve: true,
          reject: false,
        }
      },
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
