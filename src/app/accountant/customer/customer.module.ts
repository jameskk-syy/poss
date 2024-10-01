import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { CustomerRoutingModule } from './customer-routing.module';
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
import { AddCustomerComponent } from './forms/add-customer/add-customer.component';
import { DeleteCustomerComponent } from './forms/delete-customer/delete-customer.component';
import { ViewCustomerComponent } from './forms/view-customer/view-customer.component';
import { UpdateCustomerComponent } from './forms/update-customer/update-customer.component';
import { ManageCustomersComponent } from './manage-customers/manage-customers.component';
import { AddCategoriesComponent } from './forms/add-categories/add-categories.component';
import { ManageCustomercategoriesComponent } from './manage-customercategories/manage-customercategories.component';
@NgModule({
  declarations: [
    AddCustomerComponent ,
    DeleteCustomerComponent,
    UpdateCustomerComponent,
    ViewCustomerComponent ,
    ManageCustomersComponent,
    AddCategoriesComponent,
    ManageCustomercategoriesComponent,
    
  ],
  
  imports: [
    CommonModule,
    CustomerRoutingModule,
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
export class CustomerModule { }
