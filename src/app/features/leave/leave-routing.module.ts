import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from '../../core/services/adal-8/authentication.guard';
// Page Components
import { MyLeavesComponent } from './pages/my-leaves/my-leaves.component';
import { MyWorkHandoversComponent } from './pages/my-work-handovers/my-work-handovers.component';
import { SubordinateLeavesComponent } from './pages/subordinate-leaves/subordinate-leaves.component';


export const leaveRoutes: Routes = [
  { path: 'my-leaves', component: MyLeavesComponent, canActivate: [AuthGuard] },
  { path: 'my-work-handovers', component: MyWorkHandoversComponent, canActivate: [AuthGuard] },
  { path: 'subordinate-leaves', component: SubordinateLeavesComponent, canActivate: [AuthGuard] },
];
