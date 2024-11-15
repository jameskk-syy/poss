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


@NgModule({
  declarations: [
    CompanyComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    AddVendorComponent,
    VendorComponent,
    DeleteVendorComponent
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class ConfigurationsModule { }
