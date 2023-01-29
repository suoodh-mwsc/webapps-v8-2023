import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-avatar-tooltip-card',
  templateUrl: './clib-avatar-tooltip-card.component.html',
  styleUrls: ['./clib-avatar-tooltip-card.component.scss']
})
export class ClibAvatarTooltipCardComponent implements OnInit {

  @Input() requestObj: any;
  @Input() viewType: any;

  constructor() { }

  ngOnInit() {
  }

}
