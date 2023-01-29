import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { LayoutRoutingModule } from './layout-routing.module';
// Shared Layout-Components
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { LayoutNavbarComponent } from './components/layout-navbar/layout-navbar.component';
import { LayoutSidebarComponent } from './components/layout-sidebar/layout-sidebar.component';


@NgModule({
  declarations: [
    LayoutFooterComponent,                // Shared Layout-Components
    LayoutNavbarComponent,                // Shared Layout-Components
    LayoutSidebarComponent,               // Shared Layout-Components
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  exports: [
    LayoutFooterComponent,                // Shared Layout-Components
    LayoutNavbarComponent,                // Shared Layout-Components
    LayoutSidebarComponent,               // Shared Layout-Components
  ],
  providers: [
    // HumanResourcesBaseComponent,          // Services
  ]
})
export class LayoutModule { }
