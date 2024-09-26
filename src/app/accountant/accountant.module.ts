import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountantRoutingModule } from './accountant-routing.module';
import { ReportsModule } from '../reports/reports.module';
import { SharedModule } from '../shared/shared.module';
import { StaffRoutingModule } from '../staff/staff-routing.module';
import { MainComponent } from './dashboard/main/main.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardModule } from "src/app/staff/dashboard/dashboard.module";



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    AccountantRoutingModule,
    ReportsModule,
    SharedModule,
    StaffRoutingModule,
    ComponentsModule
  ]
})
export class AccountantModule { }
