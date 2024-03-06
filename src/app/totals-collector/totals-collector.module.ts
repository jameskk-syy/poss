import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalsCollectorRoutingModule } from './totals-collector-routing.module';
import { ReportsRoutingModule } from '../reports/reports-routing.module';
import { ReportsModule } from '../reports/reports.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TotalsCollectorRoutingModule,
    ReportsRoutingModule,
    ReportsModule
  ]
})
export class TotalsCollectorModule { }
