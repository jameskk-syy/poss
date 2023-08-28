import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./authentication/page404/page404.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { Role } from "./core/models/role";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },
      {
        path: "admin",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import("./admin/admin.module").then((m) => m.AdminModule),
      },
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },
      {
        path: "staff",
        canActivate: [AuthGuard],
        data: {
          role: Role.Staff,
        },
        loadChildren: () =>
          import("./staff/staff.module").then((m)=>m.StaffModule),
      },
      {
        path: "sales-person",
        canActivate: [AuthGuard],
        data: {
          role: Role.SalesPerson,
        },
        loadChildren: () =>
          import("./sales_person/sales-person.module").then((m)=>m.SalesPerson),
      },
      {
        path: "manager",
        canActivate: [AuthGuard],
        data: {
          role: Role.Manager,
        },
        loadChildren: () =>
          import("./manager/manager.module").then((m)=>m.Manager)
      },
      {
       path: "totals-collector",
       canActivate: [AuthGuard],
       data: {
        role: Role.TotalsCollector,
       },
       loadChildren: () =>
       import("./totals-collector/totals-collector.module").then((m)=>m.TotalsCollectorModule)
      },
      {
        path: "user",
        canActivate: [AuthGuard],
        data: {
          role: Role.Collector,
        },
        loadChildren: () =>
          import("./user/user.module").then((m) => m.UserModule),
      },
      {
        path: "reports",
        canActivate: [AuthGuard],
        data: {
          role: Role.Staff,
        },
        loadChildren: () =>
          import("./reports/reports.module").then((m)=>m.ReportsModule),
      },
    ],
  },
  {
    path: "authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
