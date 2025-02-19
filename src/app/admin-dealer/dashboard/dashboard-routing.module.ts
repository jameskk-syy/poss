import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { NewItemComponent } from './new-item/new-item.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { BranchComponent } from './branch/branch.component';

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
  { path: "**", component: Page404Component },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
