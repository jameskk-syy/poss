import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountantRoutingModule } from './accountant-routing.module';
import { ReportsModule } from '../reports/reports.module';
import { SharedModule } from '../shared/shared.module';
import { StaffRoutingModule } from '../staff/staff-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountantRoutingModule,
    ReportsModule,
    SharedModule,
    StaffRoutingModule
  ]
})
export class AccountantModule { }
