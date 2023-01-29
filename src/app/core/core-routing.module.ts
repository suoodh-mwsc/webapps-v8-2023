import { Routes } from '@angular/router';
// Component
import { HomeComponent } from './_components/home/home.component';
import { ErrorUnauthorizedComponent } from './_components/error-unauthorized/error-unauthorized.component';
// Auth Guard
import { AuthGuard } from './services/adal-8/authentication.guard';


export const coreRoutes: Routes = [
  { path: 'welcome', component: HomeComponent },
  { path: 'error-unauthorized', component: ErrorUnauthorizedComponent },
];
