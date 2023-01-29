import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-e-directory-view-table',
  templateUrl: './clib-e-directory-view-table.component.html',
  styleUrls: ['./clib-e-directory-view-table.component.scss']
})
export class ClibEDirectoryViewTableComponent implements OnInit {

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
