import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalespersonComponent } from './salesperson/salesperson.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalespersonRoutingModule { }
