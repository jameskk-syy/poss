import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { ReportsModule } from '../reports/reports.module';
import { Role } from '../core/models/role';
import { MainComponent } from './dashboard/main/main.component';



const routes: Routes = [
  // {
  //   path:'dashboard',
  //   loadChildren: ()=>
  //   import('./dashboard/dashboard.module').then(m=>m.AdminDashboardModule)
    
  // },

  {
    path:'product',
    loadChildren: ()=>
    import('./product/product.module').then(m=>m.ProductModule)
    
  },

  {
    path: "dashboard",
    component: MainComponent,
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
  {
    path: 'product-sales',
    loadChildren: () => import('src/app/staff/product-sales/product-sales.module').then((m) => m.ProductSalesModule)
  }

  
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AccountantRoutingModule { }
