import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-e-directory-view-list',
  templateUrl: './clib-e-directory-view-list.component.html',
  styleUrls: ['./clib-e-directory-view-list.component.scss']
})
export class ClibEDirectoryViewListComponent implements OnInit {

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
