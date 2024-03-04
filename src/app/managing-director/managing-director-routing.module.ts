import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
    import('./dashboard/dashboard.module').then(m=>m.AdminDashboardModule)
  },
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
    
  ],
})
export class ManagingDirectorRoutingModule { }
  

