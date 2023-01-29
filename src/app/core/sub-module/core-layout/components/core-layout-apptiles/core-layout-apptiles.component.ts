import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../../../../environments/environment'

@Component({
  selector: 'app-core-layout-apptiles',
  templateUrl: './core-layout-apptiles.component.html',
  styleUrls: ['./core-layout-apptiles.component.scss']
})
export class CoreLayoutApptilesComponent implements OnInit {

  appConfig = environment.appConfig;


  @Input() selectedAppTitle: any;
  @Input() selectedAppIcon: any;

  
  constructor() { }

  ngOnInit() {
  }

  selectApp(appTitle, appIcon) {
    console.log('selectApp', appTitle);
    console.log('selectApp', appIcon);
    this.selectedAppTitle = appTitle;
    this.selectedAppIcon = appIcon;
  }

}
