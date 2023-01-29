import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-overtime-avator-rounded-circle',
  templateUrl: './clib-overtime-avator-rounded-circle.component.html',
  styleUrls: ['./clib-overtime-avator-rounded-circle.component.scss']
})
export class ClibOvertimeAvatorRoundedCircleComponent implements OnInit {

  @Input() requestObj: any;
  @Input() viewType: any;

  constructor() { }

  ngOnInit() {
  }

}
