import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehousesRoutingModule } from './warehouses-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { WarehouseTabsComponent } from './warehouse-tabs/warehouse-tabs.component';
import { StockRequisitionComponent } from './stock-requisition/stock-requisition.component';
import { WarehouseModule } from 'src/app/accountant/inventory/warehouse/warehouse.module';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';
import { RequestStockComponent } from './request-stock/request-stock.component';

@NgModule({
  declarations: [
    WarehouseTabsComponent,
    StockRequisitionComponent,
    WarehouseDetailsComponent,
    RequestStockComponent
  ],
  imports: [
    CommonModule,
    WarehousesRoutingModule,
    CommonModule,
    SharedModule,
    ComponentsModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTabsModule,
    WarehouseModule
  ]
})
export class WarehousesModule { }
