import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    CommonModule,
    SharedModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class WarehouseModule { }
