import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-service-application-form',
  templateUrl: './clib-service-application-form.component.html',
  styleUrls: ['./clib-service-application-form.component.scss']
})
export class ClibServiceApplicationFormComponent implements OnInit {

  @Input() requestList: any;
  @Input() showLoader: boolean;
  @Input() selectedApplication: any;

  constructor() { }

  ngOnInit() {
  }

}
