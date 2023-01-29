import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatLeaveRequestIdService {

  public formattedLeaveId: any;

  constructor() { }

  getLeaveIdFormat(leaveId, leaveType) {
    this.formattedLeaveId = '';
    const tempId = leaveId.toString();
    const tempIdLength = tempId.length;
    let tempRightSide = '';

    if (tempIdLength === 1) {
      tempRightSide = '00000' + leaveId;
    } else if (tempIdLength === 2) {
      tempRightSide = '0000' + leaveId;
    } else if (tempIdLength === 3) {
      tempRightSide = '000' + leaveId;
    } else if (tempIdLength === 4) {
      tempRightSide = '00' + leaveId;
    } else if (tempIdLength === 5) {
      tempRightSide = '0' + leaveId;
    } else {
      tempRightSide = leaveId;
    }

    // let formattedLeaveId = '';
    // tslint:disable-next-line:prefer-const
    let leaveRequestAbsenceTypeDescription = leaveType.toLowerCase();
    if (leaveRequestAbsenceTypeDescription.includes('annual')) {
      this.formattedLeaveId = '#9000-' + tempRightSide;
    } else if (leaveRequestAbsenceTypeDescription.includes('maternity')) {
      this.formattedLeaveId = '#9002-' + tempRightSide;
    } else if (leaveRequestAbsenceTypeDescription.includes('paternity')) {
      this.formattedLeaveId = '#9003-' + tempRightSide;
    } else if (leaveRequestAbsenceTypeDescription.includes('compassionate')) {
      this.formattedLeaveId = '#9004-' + tempRightSide;
    } else if (leaveRequestAbsenceTypeDescription.includes('circumcision')) {
      this.formattedLeaveId = '#9005-' + tempRightSide;
    }
    console.log('formattedLeaveId', this.formattedLeaveId);
    return this.formattedLeaveId;
  }

}
