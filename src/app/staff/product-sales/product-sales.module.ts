import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSalesRoutingModule } from './product-sales-routing.module';
import { ProductSalesComponent } from './product-sales.component';


@NgModule({
  declarations: [
    ProductSalesComponent
  ],
  imports: [
    CommonModule,
    ProductSalesRoutingModule
  ]
})
export class ProductSalesModule { }
