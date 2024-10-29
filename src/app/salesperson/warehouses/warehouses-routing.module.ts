import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseTabsComponent } from './warehouse-tabs/warehouse-tabs.component';

const routes: Routes = [{path: 'main', component:WarehouseTabsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehousesRoutingModule { }
