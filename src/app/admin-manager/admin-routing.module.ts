import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.AdminDashboardModule),
  },

  {
    path: "configurations",
    loadChildren: () =>
      import("./configurations/configurations.module").then((m) => m.ConfigurationsModule),
  },
  
  {
    path: "roles",
    loadChildren: () =>
      import("./roles/roles.module").then((m) => m.RolesModule),
  },

  {
    path: "user-accounts",
    loadChildren: () =>
      import("./users/users.module").then((m) => m.UsersModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule { }
