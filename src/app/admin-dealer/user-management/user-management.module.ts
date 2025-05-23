import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { MatMenuModule } from '@angular/material/menu';
import { RoleLkupComponent } from './role-lkup/role-lkup.component';
import { ViewManagersComponent } from './view-managers/view-managers.component';
import { CreateManagerComponent } from './create-manager/create-manager.component';


@NgModule({
  declarations: [
    CreateUserComponent,
    ViewUsersComponent,
    RoleLkupComponent,
    ViewManagersComponent,
    CreateManagerComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatMenuModule 
  ]
})
export class UserManagementModule { }
