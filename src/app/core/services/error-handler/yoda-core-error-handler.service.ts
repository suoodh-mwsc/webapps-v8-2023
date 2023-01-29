import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YodaCoreErrorHandlerService {

  // Error Handling
  apiError: any = { 'general_api_error': null, 'model_state_error': [] };
  model_state_error: any;
  general_api_error: any;


  constructor() { }


  public handleError(error: any) {
    console.log('error', error);
    console.log('error.status', error.status);

    return new Promise((resolve, reject) => {
      if (error.status === 400) {
        this.apiError.general_api_error = error.error.error_message;
        this.apiError.model_state_error = error.error.errors;
      } else if (error.status === 401) {
      } else if (error.status === 403) {
        this.apiError.general_api_error = 'Authorization Error! You are not authorized to view this content';
      } else if (error.status === 404) {
      } else if (error.status === 405) {
      } else if (error.status === 406) {
      } else if (error.status === 412) {
      } else if (error.status === 415) {
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.apiError.general_api_error = 'oh snap! unknown error occurred';
      } else {
        this.apiError.general_api_error = error.error.error_message;
      }
      console.log('error this.apiError', this.apiError);
      resolve(this.apiError);
    });
  }
}
