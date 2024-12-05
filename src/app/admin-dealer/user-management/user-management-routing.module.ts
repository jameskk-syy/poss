import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUsersComponent } from './view-users/view-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewManagersComponent } from './view-managers/view-managers.component';


const routes: Routes = [
  {
    path: "branch-managers",
    component: ViewManagersComponent
  },

  {
    path: "users",
    component: ViewUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
