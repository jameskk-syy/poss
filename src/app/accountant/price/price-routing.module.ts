import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceManagementComponent } from './price-management/price-management.component';

const routes: Routes = [{path: '', component: PriceManagementComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceRoutingModule { }
