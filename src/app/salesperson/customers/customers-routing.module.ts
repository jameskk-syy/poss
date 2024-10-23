import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSalespersonComponent } from './manage-salesperson/manage-salesperson.component';

const routes: Routes = [{path: 'main', component:ManageSalespersonComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
