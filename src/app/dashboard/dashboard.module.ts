import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { LayoutComponent } from './layout/layout.component';
import { NavComponent } from '../shared/nav/nav.component';
import { AddStudentComponent } from './add-student/add-student.component';

@NgModule({
  declarations: [HomeComponent, EditComponent, LayoutComponent, NavComponent],
  imports: [CommonModule, DashboardRoutingModule, AddStudentComponent],
})
export class DashboardModule {}
