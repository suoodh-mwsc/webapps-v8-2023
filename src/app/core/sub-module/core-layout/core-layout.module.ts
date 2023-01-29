import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { CoreLayoutRoutingModule } from './core-layout-routing.module';
// Components
import { CoreLayoutApptilesComponent } from './components/core-layout-apptiles/core-layout-apptiles.component';
import { CoreLayoutNavbarComponent } from './components/core-layout-navbar/core-layout-navbar.component';
import { CoreLayoutNotificationComponent } from './components/core-layout-notification/core-layout-notification.component';
import { CoreLayoutPendingApprovalsComponent } from './components/core-layout-pending-approvals/core-layout-pending-approvals.component';


@NgModule({
  declarations: [
    CoreLayoutApptilesComponent,
    CoreLayoutNavbarComponent,
    CoreLayoutNotificationComponent,
    CoreLayoutPendingApprovalsComponent
  ],
  imports: [
    CommonModule,
    CoreLayoutRoutingModule
  ],
  exports: [
    CoreLayoutApptilesComponent,
    CoreLayoutNavbarComponent,
    CoreLayoutNotificationComponent,
    CoreLayoutPendingApprovalsComponent
  ],
  providers: [
  ],
})
export class CoreLayoutModule { }
