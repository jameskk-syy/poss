import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { Role } from '../core/models/role';
import { MainComponent } from './dashboards/main/main.component';



const routes: Routes = [
  
  { path: "main",
    component: MainComponent
   },

  { path: "customers",
   loadChildren: () =>
   import('./customers/customers.module').then((m)=> m.CustomersModule)
  },

  {
    path:'salespersons',
    loadChildren: ()=>
    import('./salespersons/salespersons.module').then(m=>m.SalespersonsModule)
  },

  {
    path:'warehouses',
    loadChildren: ()=>
    import('./warehouses/warehouses.module').then(m=>m.WarehousesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalespersonRoutingModule { }

