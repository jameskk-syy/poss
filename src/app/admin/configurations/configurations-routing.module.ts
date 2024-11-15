import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company/company.component';
import { VendorComponent } from './vendor/vendor/vendor.component';

const routes: Routes = [
  { 
    path: "company",
    component: CompanyComponent
  },
  { 
    path: "department",
    component: CompanyComponent
  },
  { 
    path: "vendor",
    component: VendorComponent
  },
  { 
    path: "customer",
    component: CompanyComponent
  },
  { 
    path: "product",
    component: CompanyComponent
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
