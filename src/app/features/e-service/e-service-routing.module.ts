import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
// import { AuthGuard } from './../../core/services/adal-8/authentication.guard';
// Page Components
import { SearchComponent } from './pages/search/search.component';
import { ApplicationPendingComponent } from './pages/application-pending/application-pending.component';
import { ApplicationQuotationComponent } from './pages/application-quotation/application-quotation.component';
import { ApplicationReportComponent } from './pages/application-report/application-report.component';

export const eServiceRoutes: Routes = [
  { path: 'user/search', component: SearchComponent },
  { path: 'application/pending', component: ApplicationPendingComponent },
  { path: 'application/quotation', component: ApplicationQuotationComponent },
  { path: 'application/report', component: ApplicationReportComponent},
];

