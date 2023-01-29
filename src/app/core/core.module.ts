import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Routing
import { coreRoutes } from './core-routing.module';
// Plugins
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// Plugins
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// sub-module
import { CoreLayoutModule } from './sub-module/core-layout/core-layout.module';
// Components
import { HomeComponent } from './_components/home/home.component';
import { ErrorUnauthorizedComponent } from './_components/error-unauthorized/error-unauthorized.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { FooterComponent } from './_components/footer/footer.component';
// Service
import { AuthGuard } from './services/adal-8/authentication.guard';
import { AdminLayoutComponent } from './_layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './_layouts/auth-layout/auth-layout.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(coreRoutes),
    PerfectScrollbarModule,
    CollapseModule.forRoot(),
    CoreLayoutModule,
  ],
  declarations: [
    HomeComponent,
    ErrorUnauthorizedComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  exports: [
    HomeComponent,
    ErrorUnauthorizedComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    AuthGuard,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],

})
export class CoreModule { }
