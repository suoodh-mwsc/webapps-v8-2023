import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  public errorMessage: any = '';

  constructor(private router: Router) { }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      this.handle400Error(error);
    } else if (error.status === 401) {
      this.handle401Error(error);
    } else if (error.status === 403) {
      this.handle403Error(error);
    } else if (error.status === 404) {
      this.handle404Error(error);
    } else if (error.status === 405) {
      this.handle405Error(error);
    } else if (error.status === 406) {
      this.handle406Error(error);
    } else if (error.status === 412) {
      this.handle412Error(error);
    } else if (error.status === 415) {
      this.handle415Error(error);
    } else if (error.status === 0 || error.status >= 500) {
      this.handle500Error(error);
    } else {
      this.handleOtherError(error);
    }
  }


  // {
  //   "headers":{
  //   "normalizedNames":{},
  //   "lazyUpdate":null},
  //   "status":400,
  //   "statusText":"OK",
  //   "url":"https://yoda-demo.mwsc.com.mv/Utility/Customer/FromMeterNo",
  //   "ok":false,
  //   "name":"HttpErrorResponse",
  //   "message":"Http failure response for https://yoda-demo.mwsc.com.mv/Utility/Customer/FromMeterNo: 400 OK",
  //   "error":{
  //       "Message":"The request is invalid.",
  //       "ModelState":{
  //       "model.MeterNo":["The MeterNo field is required."]
  //       }
  //    }
  // }


  private handle400Error(error: HttpErrorResponse) {
    let Title = 'Oh snap! Error (400)';
    let Text = 'An error has occured';

    Title = error.error.Message;
    if (error.error.ModelState) {
      Text = '';
      // tslint:disable-next-line:prefer-const
      for (let key in error.error.ModelState) {
        if (Array.isArray(error.error.ModelState[key]) && error.error.ModelState[key].length > 0) {
          Text += key.replace('model.', '') + ': ';
          // tslint:disable-next-line:forin
          for (let subkey in error.error.ModelState[key]) {
            // Text += error.error.ModelState[key][subkey] + '<br/>';
            Text += error.error.ModelState[key][subkey] + '';
          }
        } else if (error.error.ModelState[key].length > 0) {
          // Text += key.replace('model.', '') + ': ' + error.error.ModelState[key] + '<br/>';
          Text += key.replace('model.', '') + ': ' + error.error.ModelState[key] + '';
        }
      }
    }
    this.showApiModelErrorMsg(Title, Text);
    return throwError(error || Text);
  }


  private handle401Error(error: HttpErrorResponse) {
    let Title = 'Oh snap! Error (401)';
    let Text = 'Authorization has been denied for this request. It seems that your request was Unauthorized (401)';
    this.showApiErrorMsg(Title, Text);
    return throwError(error || Text);
  }


  private handle403Error(error: HttpErrorResponse) {
    let Title = 'Oh snap! Error (403)';
    let Text = 'It seems that your request was Forbidden (403)';
    this.showApiErrorMsg(Title, Text);
    return throwError(error || Text);
  }


  private handle404Error(error: HttpErrorResponse) {
    let Title = 'Oh snap! Error (404)';
    let Text = 'It seems that your request was Not found (404)';
    this.showApiErrorMsg(Title, Text);
    return throwError(error || Text);
  }


  private handle405Error(error: HttpErrorResponse) {
    let Title = 'Oh snap! Error (405)';
    let Text = 'It seems that your request Method Not Allowed (405)';
    this.showApiErrorMsg(Title, Text);
    return throwError(error || Text);
  }


  private handle406Error(error: HttpErrorResponse) {
    let Title = 'Oh snap! Error (406)';
    let Text = 'It seems that your request Not Acceptable (406)';
    this.showApiErrorMsg(Title, Text);
    return throwError(error || Text);
  }


  private handle412Error(error: HttpErrorResponse) {
    let Title = 'Oh snap! Error (412)';
    let Text = 'It seems that your request Precondition Failed (412)';
    this.showApiErrorMsg(Title, Text);
    return throwError(error || Text);
  }


  private handle415Error(error: HttpErrorResponse) {
    let Title = 'Oh snap! Error (415)';
    let Text = 'It seems that your request was Unsupported Media Type (415)';
    this.showApiErrorMsg(Title, Text);
    return throwError(error || Text);
  }


  private handle500Error(error: HttpErrorResponse) {
    let Title = 'Oh snap! Error (500)';
    let Text = 'Cannot Connect to the Server. Internal Server Error (500)';
    this.showApiErrorMsg(Title, Text);
    return throwError(error || Text);
  }


  private handleOtherError(error: HttpErrorResponse) {
    let Title = 'Oh snap! Error';
    let Text = 'An error has occured';
    this.showApiErrorMsg(Title, Text);
    return throwError(error || Text);
  }


  private handleTestError(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    let title = 'Error';
    let text = 'An error has occured';
    title = 'Oh snap!';
    text = 'Authorization has been denied for this request. It seems that your request was Unauthorized (401)';
    // this.router.navigate(['/404']);
  }


  private createErrorMessage(error: HttpErrorResponse) {
    this.errorMessage = error.error ? error.error : error.statusText;
  }


  showApiErrorMsg(Title, Text) {
    swal({
      type: 'error',
      title: Title,
      text: Text,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2000,
    });
  }


  showApiModelErrorMsg(Title, Text) {
    swal({
      type: 'error',
      title: Title,
      text: Text,
      allowOutsideClick: false,
    });
  }

}
