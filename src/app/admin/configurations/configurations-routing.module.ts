import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company/company.component';
import { VendorComponent } from './vendor/vendor/vendor.component';
import { MainComponent } from './departments/main/main.component';
import { CustomersComponent } from './customers/customers/customers.component';
import { ProductsComponent } from './products/products/products.component';


const routes: Routes = [
  { 
    path: "company",
    component: CompanyComponent
  },
  { 
    path: "department",
    component: MainComponent
  },
  { 
    path: "vendor",
    component: VendorComponent
  },
  { 
    path: "customer",
    component: CustomersComponent
  },
  { 
    path: "product",
    component: ProductsComponent
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
