import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { FeaturesRoutingModule } from './features-routing.module';
// Plugins
import { NgApexchartsModule } from 'ng-apexcharts';
// Orchestra-Module
import { MwscCommonModule } from './mwsc-common/mwsc-common.module';
import { LeaveModule } from './leave/leave.module';
import { DutyrosterModule } from './dutyroster/dutyroster.module';
import { EServiceModule } from './e-service/e-service.module';
import { PaymentModule } from './payment/payment.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    NgApexchartsModule,
    DutyrosterModule,                         // Orchestra-Module
    EServiceModule,                           // Orchestra-Module
    PaymentModule,                            // Orchestra-Module
    MwscCommonModule,                         // Orchestra-Module
    LeaveModule,                              // Orchestra-Module
  ]
})
export class FeaturesModule { }
