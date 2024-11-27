import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBranchesComponent } from './view-branches/view-branches.component';

const routes: Routes = [

  {
    path: "main",
    component: ViewBranchesComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
