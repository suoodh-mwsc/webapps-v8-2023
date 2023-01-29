export const environment = {
  
  production: true,
  appVersion: require('../../package.json').version,

  staffAppApiConfig: {
    frontend_url: 'https://staff-app-api-beta-01.mwsc.com.mv/',
    api_url: 'https://staff-app-api-beta-01.mwsc.com.mv/',
    api_server: 'localhost',

    api_json_server_url: 'http://localhost:3001/',
    api_json_server: true,
  },

  adalConfig: {
    tenant: 'mwscnet.onmicrosoft.com',
    clientId: 'e325cce5-05cc-40c0-a528-46c4dbccff6b',
    popUp: false,
    // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
    redirectUri: 'https://staff-portal-beta-01.mwsc.com.mv/',
    postLogoutRedirectUri: 'https://login.microsoftonline.com/e325cce5-05cc-40c0-a528-46c4dbccff6b/oauth2/logout?post_logout_redirect_uri=https://localhost:4200/login',
    navigateToLoginRequestUrl: true,
  },

  msalConfig: {
    redirectUrl: 'http://localhost',
    authUrl: 'https://login.microsoftonline.com/325b3561-b516-450a-aff4-e04928240b87/oauth2/v2.0/authorize',
    accessTokenUrl: 'https://login.microsoftonline.com/325b3561-b516-450a-aff4-e04928240b87/oauth2/v2.0/token',
    uiClienId: '074b28cc-a77c-4610-97cd-5b434fc292eb',
    clientSecret: 'bW_lHGry~yqXpksmaDZBCcEsW22Jp~69~0',
    scopeUri: 'api://c6d3e45e-d37c-40c7-997d-a72791506c64/user_impersonation',
    state: 'test',
  },

  // baseUrl:'http://localhost:58980/',
  // scopeUri: ['api://e283d8fb-22ad-4e2c-9541-14f6f118a08f/sarath'],
  // tenantId: 'adbbbd82-76e5-4952-8531-3cc59f3c1fdd',
  // uiClienId: '28a65047-6d13-4566-aba6-bd6d6dcd170b',
  // redirectUrl: 'http://localhost:4200'

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
          shorten: false,
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
          action: true,
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
          reject: true,
        }
      },
    }
  }
};
