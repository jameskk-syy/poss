import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceRoutingModule } from './price-routing.module';
import { PriceComponent } from './price/price.component';
import { AddPriceComponent } from './forms/add-price/add-price.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PriceManagementComponent } from './price-management/price-management.component';
import { UpdatePriceComponent } from './forms/update-price/update-price.component';
import { DeletePriceComponent } from './forms/delete-price/delete-price.component';


@NgModule({
  declarations: [
    PriceComponent,
    AddPriceComponent,
    PriceManagementComponent,
    UpdatePriceComponent,
    DeletePriceComponent
   ],
  imports: [
    CommonModule,
    PriceRoutingModule,
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
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class PriceModule { }
