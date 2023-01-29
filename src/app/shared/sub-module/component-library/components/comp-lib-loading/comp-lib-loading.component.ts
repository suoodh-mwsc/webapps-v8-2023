import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comp-lib-loading',
  templateUrl: './comp-lib-loading.component.html',
  styleUrls: ['./comp-lib-loading.component.scss']
})
export class CompLibLoadingComponent implements OnInit {

  @Input() viewType: any;

  constructor() { }

  ngOnInit() {
  }

}
