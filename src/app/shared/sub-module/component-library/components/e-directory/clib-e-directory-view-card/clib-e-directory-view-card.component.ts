import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-e-directory-view-card',
  templateUrl: './clib-e-directory-view-card.component.html',
  styleUrls: ['./clib-e-directory-view-card.component.scss']
})
export class ClibEDirectoryViewCardComponent implements OnInit {

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
