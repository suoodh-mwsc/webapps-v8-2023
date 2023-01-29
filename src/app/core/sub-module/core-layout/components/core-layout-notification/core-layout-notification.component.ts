import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-core-layout-notification',
  templateUrl: './core-layout-notification.component.html',
  styleUrls: ['./core-layout-notification.component.scss']
})
export class CoreLayoutNotificationComponent implements OnInit {

  daysCount: any;

  @Input() totalNotificationCount: any;
  @Input() pendingNotificationList: any;
  @Input() pendingNotificationListPagination: any;
  @Input() showLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

  fromNowDateDiff(date){
    // const tmpStartDate = moment(TakenFrom);
    // const tmpEndDate = moment(TakenTo);
    // // tslint:disable-next-line:prefer-const
    // this.daysCount = tmpEndDate.diff(tmpStartDate, 'days') + 1;
    // console.log('date diff', this.daysCount);

    // return this.daysCount;

    this.daysCount =  moment(date).fromNow();
    console.log('date diff', this.daysCount);
    return this.daysCount;
  }

}
