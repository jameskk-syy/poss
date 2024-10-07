import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StockRoutingModule } from './stock-routing.module';
import { StockManagementComponent } from './stock-management/stock-management.component';
import { StocksComponent } from './stocks/stocks.component';
import { AddStockComponent } from './form/add-stock/add-stock.component';
import { EditStockComponent } from './form/edit-stock/edit-stock.component';
import { DeleteStockComponent } from './form/delete-stock/delete-stock.component';


@NgModule({
  declarations: [
    StockManagementComponent,
    StocksComponent,
    AddStockComponent,
    EditStockComponent,
    DeleteStockComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    CommonModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableExporterModule,
    SharedModule,
    ComponentsModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule, 
    MatSelectModule,
    MaterialModule,
    ReactiveFormsModule

  ]
})
export class StockModule { }
