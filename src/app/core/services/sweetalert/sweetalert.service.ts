import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  public showSwalAlert(alert) {
    if (alert.type === 'success') {
      this.sucessAlert(alert);
    } else if (alert.type === 'error') {
      this.errorAlert(alert);
    } else if (alert.type === 'api-model') {
      this.apiModelErrorMsg(alert);
    }
  }

  public showOnspotSwalAlert(alert) {
    if (alert.includes('true') && alert.includes('Bill # ')) {
      this.showSuccessMsg('Success', alert);
    } else {
      this.showSuccessMsg('Error', alert);
    }

    // this.showInfoMsg('Information', alert);

    // if (alert.includes('Bill # ')) {
    //   this.showSuccessMsg('Success', alert);
    // } else {
    //   this.showSuccessMsg('Error', alert);
    // }
  }

  private sucessAlert(alert) {
    let Title = alert.title;
    let Text = alert.text;
    this.showSuccessMsg(Title, Text);
  }

  private errorAlert(alert) {
    let Title = alert.title;
    let Text = alert.text;
    this.showErrorMsg(Title, Text);
  }

  private apiModelErrorMsg(alert) {
    let Title = alert.title;
    let Text = alert.text;
    this.showApiModelErrorMsg(Title, Text);
  }

  showSuccessMsg(Title, Text) {
    swal({
      type: 'success',
      title: Title,
      text: Text,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2000,
    });
  }

  showInfoMsg(Title, Text) {
    swal({
      type: 'info',
      title: Title,
      text: Text,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2000,
    });
  }

  showErrorMsg(Title, Text) {
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
