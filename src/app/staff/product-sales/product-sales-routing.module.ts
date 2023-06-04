import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductSalesComponent } from './product-sales.component';

const routes: Routes = [{ path: '', component: ProductSalesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSalesRoutingModule { }
