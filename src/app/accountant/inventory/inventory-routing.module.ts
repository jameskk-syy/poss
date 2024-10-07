import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "warehouse",
    loadChildren: () => import('./warehouse/warehouse.module').then((m)=> m.WarehouseModule)
  },
  {
    path: "stock",
    loadChildren: () => import('./stock/stock.module').then((m)=> m.StockModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
