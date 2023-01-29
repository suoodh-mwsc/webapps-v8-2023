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
import { dutyRosterRoutes } from './dutyroster-routing.module';
// Shared Layout Components
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';
// Page Components
import { ShiftComponent } from './pages/shift/shift.component';
import { ShiftEmployeeViewComponent } from './components/shift/shift-employee-view/shift-employee-view.component';
import { ShiftCalendarViewComponent } from './components/shift/shift-calendar-view/shift-calendar-view.component';
import { ShiftgroupManageComponent } from './pages/shiftgroup-manage/shiftgroup-manage.component';
import { ShiftgroupManageViewComponent } from './components/shiftgroup-manage/shiftgroup-manage-view/shiftgroup-manage-view.component';
import { ShiftgroupComponent } from './pages/shiftgroup/shiftgroup.component';
import { ShiftgroupViewComponent } from './components/shiftgroup/shiftgroup-view/shiftgroup-view.component';
import { WeeklyshiftViewComponent } from './components/weeklyshift/weeklyshift-view/weeklyshift-view.component';
import { ShiftTemplateComponent } from './pages/shift-template/shift-template.component';
import { ShiftUploadComponent } from './pages/shift-upload/shift-upload.component';
import { ShiftTemplateViewComponent } from './components/shift-template/shift-template-view/shift-template-view.component';
import { ShiftUploadViewComponent } from './components/shift-upload/shift-upload-view/shift-upload-view.component';
import { WeeklyshiftComponent } from './pages/weeklyshift/weeklyshift.component';
import { WeeklyshiftActionsComponent } from './components/weeklyshift/weeklyshift-actions/weeklyshift-actions.component';
import { WeeklyshiftCommonViewComponent } from './components/weeklyshift/weeklyshift-common-view/weeklyshift-common-view.component';

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
    RouterModule.forChild(dutyRosterRoutes),        // Routing
  ],
  declarations: [
    ShiftgroupComponent,                            // Page-Component
    ShiftgroupManageComponent,                      // Page-Component
    WeeklyshiftComponent,                           // Page-Component
    ShiftTemplateComponent,                         // Page-Component
    ShiftUploadComponent,                           // Page-Component
    ShiftComponent,                                 // Page-Component
    ShiftgroupViewComponent,                        // Shared-Component
    ShiftgroupManageViewComponent,                  // Shared-Component
    WeeklyshiftActionsComponent,                    // Shared-Component
    WeeklyshiftViewComponent,                       // Shared-Component
    WeeklyshiftCommonViewComponent,                 // Shared-Component
    ShiftTemplateViewComponent,                     // Shared-Component
    ShiftUploadViewComponent,                       // Shared-Component
    ShiftEmployeeViewComponent,                     // Shared-Component
    ShiftCalendarViewComponent,                     // Shared-Component
  ],
  exports: [
    ShiftgroupComponent,                            // Page-Component
    ShiftgroupManageComponent,                      // Page-Component
    WeeklyshiftComponent,                           // Page-Component
    ShiftTemplateComponent,                         // Page-Component
    ShiftUploadComponent,                           // Page-Component
    ShiftComponent,                                 // Page-Component
    ShiftgroupViewComponent,                        // Shared-Component
    ShiftgroupManageViewComponent,                  // Shared-Component
    WeeklyshiftActionsComponent,                    // Shared-Component
    WeeklyshiftViewComponent,                       // Shared-Component
    WeeklyshiftCommonViewComponent,                 // Shared-Component
    ShiftTemplateViewComponent,                     // Shared-Component
    ShiftUploadViewComponent,                       // Shared-Component
    ShiftEmployeeViewComponent,                     // Shared-Component
    ShiftCalendarViewComponent,                     // Shared-Component
  ],
})
export class DutyrosterModule { }
