import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCustomersComponent } from './manage-customers/manage-customers.component';


const routes: Routes = [{ path: 'customers', component: ManageCustomersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
