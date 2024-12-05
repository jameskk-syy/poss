import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path:"dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule)
  },

  {
    path:"branches",
    loadChildren: () =>
      import("./branches/branches.module").then((m) => m.BranchesModule)
  },

  {
    path:"user-roles",
    loadChildren: () =>
      import("./role-management/role-management.module").then((m) => m.RoleManagementModule)
  },

  {
    path:"user-accounts",
    loadChildren: () =>
      import("./user-management/user-management.module").then((m) => m.UserManagementModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerRoutingModule { }
