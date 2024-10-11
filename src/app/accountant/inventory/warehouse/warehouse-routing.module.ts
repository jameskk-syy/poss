import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoriesComponent } from './inventories/inventories.component';
import { ViewWarehouseProductsComponent } from './view-warehouse-products/view-warehouse-products.component'; 

const routes: Routes = [
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full"
  },
  {
    path: 'main',
    component: InventoriesComponent
  },
  {
    path: 'warehouse-stock/:code', 
    component: ViewWarehouseProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
