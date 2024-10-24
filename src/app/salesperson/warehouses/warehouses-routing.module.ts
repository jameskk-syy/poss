import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewWarehouseProductsComponent } from 'src/app/accountant/inventory/warehouse/view-warehouse-products/view-warehouse-products.component';

const routes: Routes = [{path: 'main', component:ViewWarehouseProductsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehousesRoutingModule { }
