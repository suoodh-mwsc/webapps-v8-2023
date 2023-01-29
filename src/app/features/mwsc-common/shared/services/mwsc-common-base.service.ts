import { Injectable } from '@angular/core';
import { ApiBaseService } from './../../../../core/services/api-related/api-base.service';
import { JsonServerService } from './../../../../core/services/json-server/json-server.service';
import { environment } from './../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MwscCommonBaseService {

  constructor(
    private apiBase: ApiBaseService,
    private jsonServerBase: JsonServerService) { }


  // POST Employee/Search
  getEmployeeSearch(dataBody) {
    if (environment.staffAppApiConfig.api_json_server === true) {
      // Node Json Server
      return this.jsonServerBase.get('Employee/Search');
    } else {
      // MWSC - Api Server
      return this.apiBase.post('Employee/Search', dataBody);
    }
  }


  // GET Employee/{Id}/Picture/Base64
  getMyProfilePictureBase64(employeeId) {
    if (environment.staffAppApiConfig.api_json_server === true) {
      // Node Json Server
      return this.jsonServerBase.get('Employee/EmployeeId/Picture/Base64');
    } else {
      // MWSC - Api Server
      return this.apiBase.getBase64('Employee/' + employeeId + '/Picture/Base64');
    }
  }

}
