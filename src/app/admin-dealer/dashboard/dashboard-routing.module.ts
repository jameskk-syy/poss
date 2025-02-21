import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { NewItemComponent } from './new-item/new-item.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { BranchComponent } from './branch/branch.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CategoryComponent } from './category/category.component';

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
  { path: "**", component: Page404Component },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
