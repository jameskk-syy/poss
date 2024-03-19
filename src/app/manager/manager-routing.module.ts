import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { Role } from '../core/models/role';

const routes: Routes = [
  {
    path:'dashboard',
    loadChildren: ()=>
    import('./dashboard/dashboard.module').then(m=>m.AdminDashboardModule)
  },
  {
    path: 'reports',
    canActivate: [AuthGuard],
    data: {
      role: Role.Manager
    },
    loadChildren: () => import ('src/app/reports/reports.module').then((m) => m.ReportsModule )
  },
  {
    path: 'sales',
    loadChildren: () => import('src/app/staff/sales/sales.module').then((m) => m.SalesModule)
  },
  {
    path: 'product-sales',
    loadChildren: () => import('src/app/staff/product-sales/product-sales.module').then((m) => m.ProductSalesModule)
  }
  
  // {
  //   path:'payment',
  //   loadChildren: ()=>
  //   import('./dashboard/dashboard.module').then(m=>m.AdminDashboardModule)
  // }
  
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ManagerRouting { }
