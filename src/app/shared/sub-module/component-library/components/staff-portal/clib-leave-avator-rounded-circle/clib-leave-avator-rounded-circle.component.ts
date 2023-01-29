import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-leave-avator-rounded-circle',
  templateUrl: './clib-leave-avator-rounded-circle.component.html',
  styleUrls: ['./clib-leave-avator-rounded-circle.component.scss']
})
export class ClibLeaveAvatorRoundedCircleComponent implements OnInit {

  @Input() picturePath: any;
  @Input() viewType: any;

  constructor() { }

  ngOnInit() {
  }

}
