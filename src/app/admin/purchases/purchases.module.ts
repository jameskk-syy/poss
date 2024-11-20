import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { CreatePurchaseComponent } from './fuel-purchases/create-purchase/create-purchase.component';
import { ViewPurchaseComponent } from './fuel-purchases/view-purchase/view-purchase.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { ConfigurationsRoutingModule } from '../configurations/configurations-routing.module';
import { CreateLubesPurchaseComponent } from './lubes-purchases/create-lubes-purchase/create-lubes-purchase.component';
import { ViewLubesPurchaseComponent } from './lubes-purchases/view-lubes-purchase/view-lubes-purchase.component';
import { ViewLpgPurchaseComponent } from './lpg-purchases/view-lpg-purchase/view-lpg-purchase.component';
import { CreateLpgPurchaseComponent } from './lpg-purchases/create-lpg-purchase/create-lpg-purchase.component';


@NgModule({
  declarations: [
    CreatePurchaseComponent,
    ViewPurchaseComponent,
    MainComponent,
    CreateLubesPurchaseComponent,
    ViewLubesPurchaseComponent,
    ViewLpgPurchaseComponent,
    CreateLpgPurchaseComponent
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    CommonModule,
    ConfigurationsRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatTabsModule 
  ]
})
export class PurchasesModule { }
