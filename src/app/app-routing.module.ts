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

      // dealer
      {
        path: "dealer",
        canActivate: [AuthGuard],
        data: {
          roles: [Role.Admin, Role.STOREKEEPER, Role.CASHIER],
        },
        loadChildren: () =>
          import("./admin-dealer/dealer.module").then((m) => m.DealerModule),
      },      
      // manager
      {
        path: "manager",
        canActivate: [AuthGuard],
        data: {
          role: Role.Manager,
        },
        loadChildren: () =>
          import("./admin-manager/admin.module").then((m) => m.AdminModule),
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
