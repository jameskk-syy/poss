import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { ReportsModule } from '../reports/reports.module';
import { Role } from '../core/models/role';

const routes: Routes = [
  {
    path:'dashboard',
    loadChildren: ()=>
    import('./dashboard/dashboard.module').then(m=>m.AdminDashboardModule)
    
  },
  {
    path: "reports",
    canActivate: [AuthGuard],
    data: {
      role: Role.Accountant,
    },
    loadChildren: () =>
      import("../reports/reports.module").then((m)=>m.ReportsModule),
  },

  
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AccountantRoutingModule { }
