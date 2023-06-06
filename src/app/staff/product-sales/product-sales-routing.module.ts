import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductSalesManagementComponent } from './product-sales-management/product-sales-management.component';

const routes: Routes = [{ path: '', component: ProductSalesManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSalesRoutingModule { }
