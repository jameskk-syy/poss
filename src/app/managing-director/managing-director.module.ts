import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagingDirectorRoutingModule } from './managing-director-routing.module';
import { ReportsRoutingModule } from '../reports/reports-routing.module';
import { StaffRoutingModule } from '../staff/staff-routing.module';




@NgModule({
  
  imports: [
    CommonModule,
    ManagingDirectorRoutingModule,
    ReportsRoutingModule,
    StaffRoutingModule
  ]
})
export class ManagingDirectorModule { }
