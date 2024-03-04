import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRouting } from './manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StaffRoutingModule } from '../staff/staff-routing.module';
import { MatTableModule } from '@angular/material/table';
import { ComponentsModule } from '../shared/components/components.module';
import { RouterModule,Routes } from '@angular/router'
import { SmsModule } from '../staff/sms/sms.module';
import { ReportsModule } from '../reports/reports.module';





@NgModule({
  imports: [
    CommonModule,
    ManagerRouting,
    StaffRoutingModule,
    SharedModule,
    MatTableModule,
    ComponentsModule,
    RouterModule,
    SmsModule,
    ReportsModule
  ],
})
export class Manager { }
