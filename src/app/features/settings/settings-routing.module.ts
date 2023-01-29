import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/adal-8/authentication.guard';
// Page Components
import { StaffPortalComponent } from './pages/staff-portal/staff-portal.component';
import { SupervisorPortalComponent } from './pages/supervisor-portal/supervisor-portal.component';


export const settingsRoutes: Routes = [
  { path: 'staff-portal', component: StaffPortalComponent, canActivate: [AuthGuard] },
  { path: 'supervisor-portal', component: SupervisorPortalComponent, canActivate: [AuthGuard] },
];

