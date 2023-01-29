import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-employee-profile',
  templateUrl: './clib-employee-profile.component.html',
  styleUrls: ['./clib-employee-profile.component.scss']
})
export class ClibEmployeeProfileComponent implements OnInit {

  @Input() requestObj: any;
  @Input() viewType: any;

  constructor() { }

  ngOnInit() {
  }

}
