import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { SkuComponent } from './sku/sku.component';



@NgModule({
  declarations: [
    CategoryComponent,
    ProductsComponent,
    SkuComponent,
   
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
