import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
// Auth Services
import { AuthGuard } from './core/services/adal-8/authentication.guard';
// CoreModule - Componets
import { HomeComponent } from './core/_components/home/home.component';
import { ErrorUnauthorizedComponent } from './core/_components/error-unauthorized/error-unauthorized.component';
// Layout
import { AuthLayoutComponent } from "./core/_layouts/auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./core/_layouts/admin-layout/admin-layout.component";



// export const mainRoutes: Routes = [
const AppRoutes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full', },

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'common', 
        loadChildren: () => import('./features/mwsc-common/mwsc-common.module').then(m => m.MwscCommonModule) 
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'leave', 
        loadChildren: () => import('./features/leave/leave.module').then(m => m.LeaveModule) 
      }
    ]
  },
    {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'dutyroster', 
        loadChildren: () => import('./features/dutyroster/dutyroster-routing.module').then(m => m.dutyRosterRoutes)
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'e-services', 
        loadChildren: () => import('./features/e-service/e-service-routing.module').then(m => m.eServiceRoutes)
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'payment', 
        loadChildren: () => import('./features/payment/payment-routing.module').then(m => m.paymentRoutes) 
      }
    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
    // { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes, { useHash: true })
    // RouterModule.forRoot(mainRoutes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
