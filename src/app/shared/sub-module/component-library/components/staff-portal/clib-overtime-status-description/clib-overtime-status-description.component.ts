import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-overtime-status-description',
  templateUrl: './clib-overtime-status-description.component.html',
  styleUrls: ['./clib-overtime-status-description.component.scss']
})
export class ClibOvertimeStatusDescriptionComponent implements OnInit {

  @Input() requestObj: any;
  @Input() viewType: any;

  constructor() { }

  ngOnInit() {
  }


  getStatusDescriptionColorCode(requestObj) {
    if (requestObj.overtime_request_status_description === 'Request is approved' ||
      requestObj.overtime_request_status_description === 'Request is approved' ||
      requestObj.overtime_request_status_description.includes('Request is approved')) {
      return 'badge badge-success';
    }
    if (requestObj.overtime_request_status_description === 'Pending HR approval' ||
      requestObj.overtime_request_status_description === 'Request is sent for HR approval' ||
      requestObj.overtime_request_status_description === 'pending HR approval') {
      return 'badge badge-info';
    }
    if (requestObj.overtime_request_status_description === 'Request is sent for approval' ||
      requestObj.overtime_request_status_description === 'request is sent for approval') {
      return 'badge badge-warning';
    }
    if (requestObj.overtime_request_status_description === 'Request is sent for supervisor approval' ||
      requestObj.overtime_request_status_description === 'request is sent for supervisor approval' ||
      requestObj.overtime_request_status_description.includes('Request is sent for approval to') ||
      requestObj.overtime_request_status_description.includes('Request is sent for approval') ||
      requestObj.overtime_request_status_description.includes('Request is sent for supervisor approval') ||
      requestObj.overtime_request_status_description.includes('Request is sent for supervisor')) {
      return 'badge badge-warning';
    }
    if (requestObj.overtime_request_status_description.includes('Request is sent for division')) {
      return 'badge badge-warning';
    }
    if (requestObj.overtime_request_status_description.includes('Request has expired before division')) {
      return 'badge badge-warning';
    }
    if (requestObj.overtime_request_status_description === 'Request has expired before supervisor approval' ||
      requestObj.overtime_request_status_description === 'Request has expired before') {
      return 'badge badge-danger';
    }
    if (requestObj.overtime_request_status_description === 'Request has expired' ||
      requestObj.overtime_request_status_description === 'request has expired') {
      return 'badge badge-danger';
    }
    if (requestObj.overtime_request_status_description === 'Not sent for approval' ||
      requestObj.overtime_request_status_description === 'not sent for approval') {
      return 'badge badge-warning';
    }
  }
}
