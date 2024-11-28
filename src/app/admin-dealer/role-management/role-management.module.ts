import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { CreateRoleComponent } from './create-role/create-role.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { ViewRolesComponent } from './view-roles/view-roles.component';


@NgModule({
  declarations: [
    CreateRoleComponent,
    ViewRolesComponent,
  ],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatTabsModule 
  ]
})
export class RoleManagementModule { }
