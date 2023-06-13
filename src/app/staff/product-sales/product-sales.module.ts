import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSalesRoutingModule } from './product-sales-routing.module';
import { ProductSalesManagementComponent } from './product-sales-management/product-sales-management.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AddProductSaleComponent } from './add-product-sale/add-product-sale.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewSalesPersonComponent } from './view-sales-person/view-sales-person.component';

@NgModule({
  declarations: [
    ProductSalesManagementComponent,
    AddProductSaleComponent,
    ViewSalesPersonComponent
  ],
  imports: [
    CommonModule,
    ProductSalesRoutingModule,
    ComponentsModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    SharedModule
  ]
})
export class ProductSalesModule { }
