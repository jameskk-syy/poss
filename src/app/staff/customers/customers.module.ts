import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomersRoutingModule } from './customers-routing.module';
import { ManageCustomersComponent } from './manage-customers/manage-customers.component';
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


@NgModule({
  declarations: [
    ManageCustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
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
    MatProgressBarModule

  ]
})
export class CustomersModule { }
