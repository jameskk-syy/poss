import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { NewItemComponent } from './new-item/new-item.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { BranchComponent } from './branch/branch.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CategoryComponent } from './category/category.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SaleslistComponent } from './saleslist/saleslist.component';
import { SaleDetailComponent } from './salesdetails/salesdetails.component';
import { QuotesComponent } from './quotes/quotes.component';
import { CustomersComponent } from './customers/customers.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full",
  },
  {
    path: "main",
    component: MainComponent,
  },
  {
    path: "allitems",
    component: AllItemsComponent,
  },
  {
    path: "newitem",
    component: NewItemComponent,
  },
  {
    path: "newbranch",
    component: BranchComponent,
  },
  {
    path: "supplier",
    component: SuppliersComponent,
  },
  {
    path: "category",
    component: CategoryComponent,
  },
  {
    path: "reports",
    component: ReportsComponent,
  },
  {
    path: "makesale",
    component: TransactionComponent,
  },
  {
    path: "sales",
    component: SaleslistComponent,
  },
  {
    path: "saledetails",
    component: SaleDetailComponent,
  },
  {
    path: "quotes",
    component: QuotesComponent,
  },
  {
    path: "customers",
    component: CustomersComponent,
  },
  {
    path: "purchases",
    component: PurchasesComponent,
  },
  {
    path: "expenditure",
    component: ExpensesComponent,
  },
  { path: "**", component: Page404Component },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
