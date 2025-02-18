import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesRoutingModule } from './branches-routing.module';
import { ViewBranchesComponent } from './view-branches/view-branches.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { CreateBranchComponent } from './create-branch/create-branch.component';
import { ManagerLkupComponent } from './manager-lkup/manager-lkup.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteBranchComponent } from './delete-branch/delete-branch.component';
import { ActivateDeactivateBranchComponent } from './activate-deactivate-branch/activate-deactivate-branch.component';


@NgModule({
  declarations: [
    ViewBranchesComponent,
    CreateBranchComponent,
    ManagerLkupComponent,
    DeleteBranchComponent,
    ActivateDeactivateBranchComponent
  ],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    MaterialModule,
    ComponentsModule,
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
    MatListModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ]
})
export class BranchesModule { }
