import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { OwlModule } from 'ngx-owl-carousel';
import { FullCalendarModule } from '@fullcalendar/angular';           // for FullCalendar!
// Routing
import { settingsRoutes } from './settings-routing.module';
// Shared Layout Components
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';
// Page Components
import { StaffPortalComponent } from './pages/staff-portal/staff-portal.component';
import { SupervisorPortalComponent } from './pages/supervisor-portal/supervisor-portal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,               // for FullCalendar!
    PdfViewerModule,                  // PdfViewerModule
    NgxDropzoneModule,
    OwlModule,
    CoreLayoutModule,                               // ShareModule-CoreLayout (Global)
    LayoutModule,                                   // ShareModule-Layouts (Global)
    ComponentLibraryModule,                         // ShareModule-Component Library (Global)
    RouterModule.forChild(settingsRoutes),                 // Routing
  ],
  declarations: [StaffPortalComponent,SupervisorPortalComponent],
  exports: [StaffPortalComponent,SupervisorPortalComponent],
})
export class SettingsModule { }
