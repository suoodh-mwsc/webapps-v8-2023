import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { SharedRoutingModule } from './shared-routing.module';
// Submodule
import { ComponentLibraryModule } from './sub-module/component-library/component-library.module';
import { LayoutModule } from './sub-module/layout/layout.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentLibraryModule,           // Submodule
    LayoutModule,                     // Submodule
    SharedRoutingModule,              // Routing
  ],
  exports: [
  ],
  providers: [
  ],
})
export class SharedModule { }
