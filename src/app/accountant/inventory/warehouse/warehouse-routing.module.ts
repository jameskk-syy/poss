import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoriesComponent } from './inventories/inventories.component';

const routes: Routes = [
  
  {
    path: "",
    redirectTo:"main",
    pathMatch: "full"
  },
  {
    path: 'main',
    component: InventoriesComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
