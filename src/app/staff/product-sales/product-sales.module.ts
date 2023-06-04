import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSalesRoutingModule } from './product-sales-routing.module';
import { ProductSalesComponent } from './product-sales.component';
import { ProductSalesManagementComponent } from './product-sales-management/product-sales-management.component';


@NgModule({
  declarations: [
    ProductSalesComponent,
    ProductSalesManagementComponent
  ],
  imports: [
    CommonModule,
    ProductSalesRoutingModule
  ]
})
export class ProductSalesModule { }
