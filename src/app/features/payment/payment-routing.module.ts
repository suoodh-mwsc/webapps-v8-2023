import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/adal-8/authentication.guard';
// Page Components
import { OnlinePaymentsComponent } from './pages/online-payments/online-payments.component';
import { TenderPaymentsComponent } from './pages/tender-payments/tender-payments.component';
import { TppaPaymentsComponent } from './pages/tppa-payments/tppa-payments.component';
import { ExternalPaymentsComponent } from './pages/external-payments/external-payments.component';
import { MultipleAccountPaymentsComponent } from './pages/multiple-account-payments/multiple-account-payments.component';


export const paymentRoutes: Routes = [
  { path: 'online-payments', component: OnlinePaymentsComponent, canActivate: [AuthGuard] },
  { path: 'multiple-account-payments', component: MultipleAccountPaymentsComponent, canActivate: [AuthGuard] },
  { path: 'external-payments', component: ExternalPaymentsComponent, canActivate: [AuthGuard] },
  { path: 'tppa-payments', component: TppaPaymentsComponent, canActivate: [AuthGuard] },
  { path: 'tender-payments', component: TenderPaymentsComponent, canActivate: [AuthGuard] },
];
