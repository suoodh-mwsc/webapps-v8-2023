import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// Plugins - FullCalendar 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
// Routing
import { eServiceRoutes } from './e-service-routing.module';
// Shared Layout Components
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';
// Page Components
import { SearchComponent } from './pages/search/search.component';
import { ApplicationPendingComponent } from './pages/application-pending/application-pending.component';
import { ApplicationQuotationComponent } from './pages/application-quotation/application-quotation.component';
import { ApplicationReportComponent } from './pages/application-report/application-report.component';
// Shared Components
import { EServiceUserViewComponent } from './components/e-service-user/e-service-user-view/e-service-user-view.component';
import { EServiceUserActionComponent } from './components/e-service-user/e-service-user-action/e-service-user-action.component';
import { ApplicationReportViewComponent } from './components/application-report/application-report-view/application-report-view.component';
import { ApplicationPendingViewComponent } from './components/application-pending/application-pending-view/application-pending-view.component';
import { ApplicationQuotationViewComponent } from './components/application-quotation/application-quotation-view/application-quotation-view.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,                                // PdfViewerModule
    CoreLayoutModule,                               // ShareModule-CoreLayout (Global)
    LayoutModule,                                   // ShareModule-Layouts (Global)
    ComponentLibraryModule,                         // ShareModule-Component Library (Global)
    RouterModule.forChild(eServiceRoutes),          // Routing
  ],
  declarations: [
    SearchComponent,                                // Page-Component (E-Service)
    ApplicationPendingComponent,                    // Page-Component (E-Service-Application)
    ApplicationQuotationComponent,                  // Page-Component (E-Service-Application)
    ApplicationReportComponent,                     // Page-Component (E-Service-Application)
    EServiceUserViewComponent,                      // Shared-Component (E-Service)
    EServiceUserActionComponent,                    // Shared-Component (E-Service)   
    ApplicationPendingViewComponent,                // Shared-Component (E-Service-Application)
    ApplicationQuotationViewComponent,              // Shared-Component (E-Service-Application)
    ApplicationReportViewComponent,                 // Shared-Component (E-Service-Application)
  ],
  exports: [
    SearchComponent,                                // Page-Component (E-Service)
    ApplicationPendingComponent,                    // Page-Component (E-Service-Application)
    ApplicationQuotationComponent,                  // Page-Component (E-Service-Application)
    ApplicationReportComponent,                     // Page-Component (E-Service-Application)
    EServiceUserViewComponent,                      // Shared-Component (E-Service)
    EServiceUserActionComponent,                    // Shared-Component (E-Service)   
    ApplicationPendingViewComponent,                // Shared-Component (E-Service-Application)
    ApplicationQuotationViewComponent,              // Shared-Component (E-Service-Application)
    ApplicationReportViewComponent,                 // Shared-Component (E-Service-Application)
  ],
})
export class EServiceModule { }
