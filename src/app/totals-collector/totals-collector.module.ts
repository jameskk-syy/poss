import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalsCollectorRoutingModule } from './totals-collector-routing.module';
import { StaffRoutingModule } from '../staff/staff-routing.module';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ReportsModule } from '../reports/reports.module';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { SmsModule } from '../staff/sms/sms.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TotalsCollectorRoutingModule,
    StaffRoutingModule,
    CommonModule,
    StaffRoutingModule,
    SharedModule,
    MatTableModule,
    ComponentsModule,
    RouterModule,
    SmsModule,
    ReportsModule
  ]
})
export class TotalsCollectorModule { }
