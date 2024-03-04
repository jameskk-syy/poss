import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { ReportsModule } from '../reports/reports.module';
import { ProductSalesModule } from '../staff/product-sales/product-sales.module';




@NgModule({
  
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    MatTableModule,
    ReportsModule,
    ProductSalesModule
  ]
})
export class ManagingDirectorModule { }
