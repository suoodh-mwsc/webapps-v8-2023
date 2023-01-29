import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { FeaturesRoutingModule } from './features-routing.module';
// Plugins
import { NgApexchartsModule } from 'ng-apexcharts';
// Orchestra-Module
import { MwscCommonModule } from './mwsc-common/mwsc-common.module';
import { LeaveModule } from './leave/leave.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    NgApexchartsModule,
    MwscCommonModule,                         // Orchestra-Module
    LeaveModule,                              // Orchestra-Module
  ]
})
export class FeaturesModule { }
