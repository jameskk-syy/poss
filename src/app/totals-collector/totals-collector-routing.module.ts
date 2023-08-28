import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'dashboard',
    loadChildren: ()=>
    import('./dashboard/dashboard.module').then(m=>m.TotalsCollectorDashboardModule)
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TotalsCollectorRoutingModule { }
