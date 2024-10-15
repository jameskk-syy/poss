import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupsRoutingModule } from './lookups-routing.module';
import { WarehouseLkupComponent } from './warehouse-lkup/warehouse-lkup.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SkuLkupComponent } from './sku-lkup/sku-lkup.component';
import { UserLkupComponent } from './user-lkup/user-lkup.component';
import { SalespersonLkupComponent } from './salesperson-lkup/salesperson-lkup.component';
import { CustomerLkupComponent } from './customer-lkup/customer-lkup.component';


@NgModule({
  declarations: [
    WarehouseLkupComponent,
    SkuLkupComponent,
    UserLkupComponent,
    SalespersonLkupComponent,
    CustomerLkupComponent
  ],
  imports: [
    CommonModule,
    LookupsRoutingModule,
    MaterialModule,
  
  ]
})
export class LookupsModule { }
