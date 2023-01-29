import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Page Components
import { WeeklyshiftCommonViewComponent } from './components/weeklyshift/weeklyshift-common-view/weeklyshift-common-view.component';
import { ShiftTemplateComponent } from './pages/shift-template/shift-template.component';
import { ShiftUploadComponent } from './pages/shift-upload/shift-upload.component';
import { ShiftComponent } from './pages/shift/shift.component';
import { ShiftgroupManageComponent } from './pages/shiftgroup-manage/shiftgroup-manage.component';
import { ShiftgroupComponent } from './pages/shiftgroup/shiftgroup.component';


export const dutyRosterRoutes: Routes = [
  // { path: 'shiftgroup', component: ShiftGroupComponent },
  { path: 'shiftgroup/:user', component: ShiftgroupComponent },
  { path: 'manage-shiftgroup/:shiftGroupId', component: ShiftgroupManageComponent },
  { path: 'weeklyshift/:shiftGroupId/:selectedYear', component: WeeklyshiftCommonViewComponent },
  { path: 'shift-template', component: ShiftTemplateComponent },
  { path: 'shift-sapupload', component: ShiftUploadComponent },
  { path: 'shift/:shiftGroupId', component: ShiftComponent },
];
