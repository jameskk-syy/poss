import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { LookupsRoutingModule } from './lookups-routing.module';
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
  declarations: [],
  imports: [
    CommonModule,
    LookupsRoutingModule,
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
  ]
})
export class LookupsModule { }
