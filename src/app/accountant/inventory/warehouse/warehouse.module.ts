import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { WarehouseDelComponent } from './warehouse-del/warehouse-del.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignWarehouseComponent } from './assign-warehouse/assign-warehouse.component';
import { WarehouseProductsComponent } from './warehouse-products/warehouse-products.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { ViewWarehouseProductsComponent } from './view-warehouse-products/view-warehouse-products.component';
import { StockWidgetsComponent } from './stock-widgets/stock-widgets.component';

@NgModule({
  declarations: [
    MainComponent,
    AddDialogComponent,
    WarehouseDelComponent,
    AssignWarehouseComponent,
    WarehouseProductsComponent, // Keep it here
    InventoriesComponent,
     ViewWarehouseProductsComponent,
     StockWidgetsComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    CommonModule,
    SharedModule,
    ComponentsModule,
    MaterialModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule
  ]
})
export class WarehouseModule { }
