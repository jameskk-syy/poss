import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalespersonComponent } from './salesperson/salesperson.component';
import { ManageSpCustomersComponent } from './manage-sp-customers/manage-sp-customers.component';
import { SpCustomerHistoryComponent } from './sp-customer-history/sp-customer-history.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full",
  },
  {
  path: "main",
    component: SalespersonComponent,
  },

  {
    path: 'viewcustomer/:id',
    component:ManageSpCustomersComponent
  },

  {
    path: 'customer-details/:id',
    component: SpCustomerHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalespersonRoutingModule { }
