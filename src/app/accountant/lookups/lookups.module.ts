import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { AccountantRoutingModule } from '../accountant-routing.module';
import { ReportsModule } from 'src/app/reports/reports.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StaffRoutingModule } from 'src/app/staff/staff-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableExporterModule } from 'mat-table-exporter'; // Importing the MatTableExporterModule

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    ComponentsModule,
    AccountantRoutingModule,
    StaffRoutingModule,
    SharedModule,
    ReportsModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatTableExporterModule // Add this line to your imports
  ]
})
export class UserLookupModule { }
