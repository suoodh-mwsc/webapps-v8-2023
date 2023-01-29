import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';           // for FullCalendar!
import { PdfViewerModule } from 'ng2-pdf-viewer';
// Routing
import { mwscCommonRoutes } from './mwsc-common-routing.module';
import { MwscCommonEDirectoryComponent } from './pages/mwsc-common-e-directory/mwsc-common-e-directory.component';
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';
import { MwscCommonAboutComponent } from './pages/mwsc-common-about/mwsc-common-about.component';
import { MwscCommonUsefulLinksComponent } from './pages/mwsc-common-useful-links/mwsc-common-useful-links.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/services/adal-8/authentication.guard';

@NgModule({
  declarations: [
    MwscCommonEDirectoryComponent,
    MwscCommonUsefulLinksComponent,
    MwscCommonAboutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,               // for FullCalendar!
    PdfViewerModule,                  // PdfViewerModule
    NgxDropzoneModule,
    CoreLayoutModule,                 // ShareModule-CoreLayout (Global)
    LayoutModule,                     // ShareModule-Layouts (Global)
    ComponentLibraryModule,           // ShareModule-Component Library (Global)
    RouterModule.forChild(mwscCommonRoutes),           // Routing
  ],
  exports: [
    MwscCommonEDirectoryComponent,
    MwscCommonUsefulLinksComponent,
    MwscCommonAboutComponent
  ],
  providers:[
    AuthGuard
  ]
})
export class MwscCommonModule { }
