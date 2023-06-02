import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomersRoutingModule } from './customers-routing.module';
import { ManageCustomersComponent } from './manage-customers/manage-customers.component';


@NgModule({
  declarations: [
    ManageCustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
