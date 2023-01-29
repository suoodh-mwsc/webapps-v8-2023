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
import { leaveRoutes } from './leave-routing.module';
// Shared Layout Components
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';
// Page Components
import { MyLeavesComponent } from './pages/my-leaves/my-leaves.component';
import { MyWorkHandoversComponent } from './pages/my-work-handovers/my-work-handovers.component';
import { LeaveActionModelComponent } from './components/leave/leave-action-model/leave-action-model.component';
import { LeaveCreateModelComponent } from './components/leave/leave-create-model/leave-create-model.component';
import { LeaveDetailsCommonViewComponent } from './components/leave/leave-details-common-view/leave-details-common-view.component';
import { LeaveViewComponent } from './components/leave/leave-view/leave-view.component';
import { WorkHandoverActionModelComponent } from './components/work-handover/work-handover-action-model/work-handover-action-model.component';
import { WorkHandoverDetailsCommonViewComponent } from './components/work-handover/work-handover-details-common-view/work-handover-details-common-view.component';
import { WorkHandoverViewComponent } from './components/work-handover/work-handover-view/work-handover-view.component';
import { MedicalLeaveCreateModelComponent } from './components/leave/medical-leave-create-model/medical-leave-create-model.component';

import { AuthGuard } from '@app/core/services/adal-8/authentication.guard';


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
    RouterModule.forChild(leaveRoutes),                 // Routing
  ],
  declarations: [
    MyLeavesComponent,                                  // Pages-Component
    MyWorkHandoversComponent,                           // Pages-Component

    LeaveActionModelComponent,
    LeaveCreateModelComponent,
    MedicalLeaveCreateModelComponent,
    LeaveDetailsCommonViewComponent,
    LeaveViewComponent,

    WorkHandoverActionModelComponent,
    WorkHandoverDetailsCommonViewComponent,
    WorkHandoverViewComponent,
  ],
  exports: [
    MyLeavesComponent,                                  // Pages-Component
    MyWorkHandoversComponent,                           // Pages-Component

    LeaveActionModelComponent,
    LeaveCreateModelComponent,
    MedicalLeaveCreateModelComponent,
    LeaveDetailsCommonViewComponent,
    LeaveViewComponent,

    WorkHandoverActionModelComponent,
    WorkHandoverDetailsCommonViewComponent,
    WorkHandoverViewComponent,
  ],
  providers:[
    AuthGuard
  ]
})
export class LeaveModule { }
