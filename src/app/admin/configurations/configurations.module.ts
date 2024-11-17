import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { CompanyComponent } from './company/company/company.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddVendorComponent } from './vendor/add-vendor/add-vendor.component';
import { VendorComponent } from './vendor/vendor/vendor.component';
import { DeleteVendorComponent } from './vendor/delete-vendor/delete-vendor.component';
import { AddDepartmentComponent } from './departments/add-department/add-department.component';
import { DepartmentsComponent } from './departments/departments/departments.component';
import { DeleteDepartmentComponent } from './departments/delete-department/delete-department.component';
import { LocationsComponent } from './departments/locations/locations/locations.component';
import { AddLocationsComponent } from './departments/locations/add-locations/add-locations.component';
import { DeleteLocationsComponent } from './departments/locations/delete-locations/delete-locations.component';
import { EditLocationsComponent } from './departments/locations/edit-locations/edit-locations.component';
import { MainComponent } from './departments/main/main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomersComponent } from './customers/customers/customers.component';
import { AddCustomersComponent } from './customers/add-customers/add-customers.component';
import { DeleteCustomersComponent } from './customers/delete-customers/delete-customers.component';



@NgModule({
  declarations: [
    CompanyComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    AddVendorComponent,
    VendorComponent,
    DeleteVendorComponent,
    AddDepartmentComponent,
    DepartmentsComponent,
    DeleteDepartmentComponent,
    LocationsComponent,
    AddLocationsComponent,
    DeleteLocationsComponent,
    EditLocationsComponent,
    MainComponent,
    CustomersComponent,
    AddCustomersComponent,
    DeleteCustomersComponent
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatTabsModule 
  ]
})
export class ConfigurationsModule { }
