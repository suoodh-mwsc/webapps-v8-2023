import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-ot-prior-approval-avator-rounded-circle',
  templateUrl: './clib-ot-prior-approval-avator-rounded-circle.component.html',
  styleUrls: ['./clib-ot-prior-approval-avator-rounded-circle.component.scss']
})
export class ClibOtPriorApprovalAvatorRoundedCircleComponent implements OnInit {

  @Input() requestObj: any;
  @Input() viewType: any;

  constructor() { }

  ngOnInit() {
  }

}
