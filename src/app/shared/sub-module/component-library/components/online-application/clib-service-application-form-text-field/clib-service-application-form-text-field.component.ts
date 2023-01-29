import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-service-application-form-text-field',
  templateUrl: './clib-service-application-form-text-field.component.html',
  styleUrls: ['./clib-service-application-form-text-field.component.scss']
})
export class ClibServiceApplicationFormTextFieldComponent implements OnInit {

  @Input() fieldLabel: any;
  @Input() fieldText: any;
  constructor() { }

  ngOnInit() {
  }

}
