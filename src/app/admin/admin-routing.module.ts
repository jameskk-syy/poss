import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.AdminDashboardModule),
  },
  {
    path: "payments",
    loadChildren: () =>
      import("./payment_records/dashboard.module").then(m=>m.PaymentRecordsModule),
  },
  {
    path: "roles",
    loadChildren: () =>
      import("./roles/roles.module").then(
        (m) => m.RolesModule
      ),
  },

  {
    path: "user-accounts",
    loadChildren: () =>
      import("./users/users.module").then(
        (m) => m.UsersModule
      ),
  },

  {
    path: "counties",
    loadChildren: () =>
      import("./counties/counties.module").then(
        (m) => m.CountiesModule
      ),
  },

  {
    path: "sub-counties",
    loadChildren: () =>
      import("./sub-counties/subcounties.module").then(
        (m) => m.SubcountiesModule
      ),
  },
  {
    path: "business-profile",
    loadChildren: () =>
      import("./profile/profile.module").then(
        (m) => m.ProfileModule
      ),
  },

  {
    path: "departments",
    loadChildren: () =>
      import("./departments/departments.module").then(
        (m) => m.DepartmentsModule
      ),
  },

  {
    path: "pickup-locations",
    loadChildren: () =>
      import("./pick-up-locations/pickup.module").then(
        (m) => m.PickupModule
      ),
  },

  {
    path: "routes",
    loadChildren: () =>
      import("./routes/routes.module").then(
        (m) => m.RoutesModule
      ),
  },

  {
    path: "price-config",
    loadChildren: () => import("src/app/staff/stock/configs/configs.module").then((m)  => m.ConfigsModule)
  },
  {
    path: "farmers",
    loadChildren: () =>
      import("src/app/staff/farmer/farmer.module").then((m) => m.FarmerModule)
  },
  {
    path: "accountant",
    loadChildren: () => import("src/app/accountant/accountant.module").then((m) => m.AccountantModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule { }
