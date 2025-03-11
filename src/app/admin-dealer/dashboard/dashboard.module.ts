import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatRadioModule } fnatorrom '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewItemComponent } from './new-item/new-item.component';
import { UsersComponent } from './users/users.component';
import { BranchComponent } from './branch/branch.component';
import { MatButtonModule } from '@angular/material/button';
import { AllItemsComponent } from './all-items/all-items.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ReportsComponent } from './reports/reports.component';
import { CategoryComponent } from './category/category.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SaleslistComponent } from './saleslist/saleslist.component';
import { SaleDetailComponent } from './salesdetails/salesdetails.component';
import { QuotesComponent } from './quotes/quotes.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { CustomersComponent } from './customers/customers.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PaymentDialogComponent } from './transaction/payment-dialog/payment-dialog.component';

@NgModule({
  declarations: [
    MainComponent,
    NewItemComponent,
    AllItemsComponent,
    UsersComponent,
    BranchComponent,
    SuppliersComponent,
    ReportsComponent,
    CategoryComponent,
    TransactionComponent,
    SaleslistComponent,
    SaleDetailComponent,
    QuotesComponent,
    PurchasesComponent,
    CustomersComponent,
    ExpensesComponent,
    PaymentDialogComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTableExporterModule,
    MatIconModule,
    MatMenuModule,
    ComponentsModule,
    SharedModule,
    CdkAccordionModule,
    DragDropModule,
    MatSelectModule,
    MatDialogModule,

    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    // MatRadioModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
})
export class DashboardModule {}
