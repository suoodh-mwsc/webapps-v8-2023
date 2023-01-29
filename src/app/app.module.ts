import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
// Routing
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Env
import { environment } from 'src/environments/environment';
// Modules
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';
// Interceptor
import { AuthInterceptor } from './core/services/Interceptor/auth.interceptor';
import { BlobErrorInterceptor } from './core/services/Interceptor/blob.error.interceptor';
// Auth
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Adal8HTTPService, Adal8Service, Adal8Interceptor, Adal8User } from 'adal-angular8';
import { AuthGuard } from './core/services/adal-8/authentication.guard';
// Toastr
import { ToastrModule } from 'ngx-toastr';
// Storage
import { CookieService } from 'ngx-cookie-service';
import { ErrorInterceptor } from './core/services/Interceptor/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
// import { MyDefaultTooltipOptions } from './my-default-options';


// const TooltipOptions = {
//   'show-delay': 500
// }


import { PopoverModule } from 'ngx-bootstrap/popover';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,                      // Imported-SysModule
    BrowserAnimationsModule,            // 
    RouterModule,                       //       
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    CoreModule,                         // Core - Module
    FeaturesModule,                     // Features - Module
    SharedModule,                       // Shared - Module
    // HttpClientModule,                // Imported-SysModule
    AppRoutingModule,                   // Main Routings
    CollapseModule.forRoot(),
    // TooltipModule.forRoot(MyDefaultTooltipOptions as TooltipOptions)
    TooltipModule,
    PopoverModule.forRoot(),
  ],
  providers: [
    CookieService,
    AuthGuard,
    Adal8Service,
    {
      provide: Adal8HTTPService,
      useFactory: Adal8HTTPService.factory,
      deps: [HttpClient, Adal8Service]
    }, //  important! HttpClient replaces Http
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BlobErrorInterceptor, multi: true },

    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
