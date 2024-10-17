import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalespersonRoutingModule } from './salesperson-routing.module';
import { SalespersonComponent } from './salesperson/salesperson.component';
import { OnboardSalespersonComponent } from './onboard-salesperson/onboard-salesperson.component';
import { ManageSalespersonComponent } from './manage-salesperson/manage-salesperson.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageSpCustomersComponent } from './manage-sp-customers/manage-sp-customers.component';
import { SpCustomerHistoryComponent } from './sp-customer-history/sp-customer-history.component';
import { EditCustomersComponent } from './form/edit-customers/edit-customers.component';
import { AddCustomersComponent } from './form/add-customers/add-customers.component';


@NgModule({
  declarations: [
    SalespersonComponent,
    OnboardSalespersonComponent,
    ManageSalespersonComponent,
    ManageSpCustomersComponent,
    SpCustomerHistoryComponent,
    EditCustomersComponent,
    AddCustomersComponent
  ],
  imports: [
    CommonModule,
    SalespersonRoutingModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableExporterModule,
    SharedModule,
    ComponentsModule,
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
export class SalespersonModule { }
