import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesRoutingModule } from './branches-routing.module';
import { ViewBranchesComponent } from './view-branches/view-branches.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [
    ViewBranchesComponent
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
