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
// Plugins - FullCalendar 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
// Routing
import { paymentRoutes } from './payment-routing.module';
// Shared Layout Components
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';
// Page Components
import { ExternalPaymentsComponent } from './pages/external-payments/external-payments.component';
import { MultipleAccountPaymentsComponent } from './pages/multiple-account-payments/multiple-account-payments.component';
import { OnlinePaymentsComponent } from './pages/online-payments/online-payments.component';
import { TenderPaymentsComponent } from './pages/tender-payments/tender-payments.component';
import { TppaPaymentsComponent } from './pages/tppa-payments/tppa-payments.component';
// Shared Components
import { ExternalPaymentsViewComponent } from './components/external/external-payments-view/external-payments-view.component';
import { ExternalPaymentsActionsComponent } from './components/external/external-payments-actions/external-payments-actions.component';
import { ExternalPaymentsCommonViewComponent } from './components/external/external-payments-common-view/external-payments-common-view.component';
import { MultipleAcPaymentsViewComponent } from './components/multiple/multiple-ac-payments-view/multiple-ac-payments-view.component';
import { MultipleAcPaymentsActionsComponent } from './components/multiple/multiple-ac-payments-actions/multiple-ac-payments-actions.component';
import { MultipleAcPaymentsCommonViewComponent } from './components/multiple/multiple-ac-payments-common-view/multiple-ac-payments-common-view.component';
import { OnlinePaymentsActionsComponent } from './components/online/online-payments-actions/online-payments-actions.component';
import { OnlinePaymentsCommonViewComponent } from './components/online/online-payments-common-view/online-payments-common-view.component';
import { OnlinePaymentsViewComponent } from './components/online/online-payments-view/online-payments-view.component';
import { TenderPaymentsActionsComponent } from './components/tender/tender-payments-actions/tender-payments-actions.component';
import { TenderPaymentsCommonViewComponent } from './components/tender/tender-payments-common-view/tender-payments-common-view.component';
import { TenderPaymentsViewComponent } from './components/tender/tender-payments-view/tender-payments-view.component';
import { TppaPaymentsActionsComponent } from './components/tppa/tppa-payments-actions/tppa-payments-actions.component';
import { TppaPaymentsCommonViewComponent } from './components/tppa/tppa-payments-common-view/tppa-payments-common-view.component';
import { TppaPaymentsViewComponent } from './components/tppa/tppa-payments-view/tppa-payments-view.component';


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
    RouterModule.forChild(paymentRoutes),  
  ],
  declarations: [
    OnlinePaymentsComponent,                             // Pages-Component
    MultipleAccountPaymentsComponent,                    // Pages-Component
    ExternalPaymentsComponent,                           // Pages-Component
    TppaPaymentsComponent,                               // Pages-Component
    TenderPaymentsComponent,                             // Pages-Component
    ExternalPaymentsActionsComponent,                    // Shared-Component
    ExternalPaymentsCommonViewComponent,                 // Shared-Component
    ExternalPaymentsViewComponent,                       // Shared-Component
    MultipleAcPaymentsActionsComponent,                  // Shared-Component
    MultipleAcPaymentsCommonViewComponent,               // Shared-Component
    MultipleAcPaymentsViewComponent,                     // Shared-Component
    OnlinePaymentsActionsComponent,                      // Shared-Component
    OnlinePaymentsCommonViewComponent,                   // Shared-Component
    OnlinePaymentsViewComponent,                         // Shared-Component
    TenderPaymentsActionsComponent,                      // Shared-Component
    TenderPaymentsCommonViewComponent,                   // Shared-Component
    TenderPaymentsViewComponent,                         // Shared-Component
    TppaPaymentsActionsComponent,                        // Shared-Component
    TppaPaymentsCommonViewComponent,                     // Shared-Component
    TppaPaymentsViewComponent,                           // Shared-Component
  ],
  exports: [
    OnlinePaymentsComponent,                             // Pages-Component
    MultipleAccountPaymentsComponent,                    // Pages-Component
    ExternalPaymentsComponent,                           // Pages-Component
    TppaPaymentsComponent,                               // Pages-Component
    TenderPaymentsComponent,                             // Pages-Component
    ExternalPaymentsActionsComponent,                    // Shared-Component
    ExternalPaymentsCommonViewComponent,                 // Shared-Component
    ExternalPaymentsViewComponent,                       // Shared-Component
    MultipleAcPaymentsActionsComponent,                  // Shared-Component
    MultipleAcPaymentsCommonViewComponent,               // Shared-Component
    MultipleAcPaymentsViewComponent,                     // Shared-Component
    OnlinePaymentsActionsComponent,                      // Shared-Component
    OnlinePaymentsCommonViewComponent,                   // Shared-Component
    OnlinePaymentsViewComponent,                         // Shared-Component
    TenderPaymentsActionsComponent,                      // Shared-Component
    TenderPaymentsCommonViewComponent,                   // Shared-Component
    TenderPaymentsViewComponent,                         // Shared-Component
    TppaPaymentsActionsComponent,                        // Shared-Component
    TppaPaymentsCommonViewComponent,                     // Shared-Component
    TppaPaymentsViewComponent,                           // Shared-Component
  ],
  providers:[
    // AuthGuard
  ]
})
export class PaymentModule { }
