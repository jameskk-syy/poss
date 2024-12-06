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


@NgModule({
  declarations: [
    ViewBranchesComponent,
    CreateBranchComponent,
    ManagerLkupComponent
  ],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatTabsModule 
  ]
})
export class BranchesModule { }
