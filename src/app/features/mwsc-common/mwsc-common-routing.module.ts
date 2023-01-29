import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/adal-8/authentication.guard';
// Pages Components (mwsc-common)
import { MwscCommonEDirectoryComponent } from './pages/mwsc-common-e-directory/mwsc-common-e-directory.component';
import { MwscCommonUsefulLinksComponent } from './pages/mwsc-common-useful-links/mwsc-common-useful-links.component';


export const mwscCommonRoutes: Routes = [
  { path: 'e-directory', component: MwscCommonEDirectoryComponent, canActivate: [AuthGuard] },
  { path: 'useful-links', component: MwscCommonUsefulLinksComponent, canActivate: [AuthGuard] },
];