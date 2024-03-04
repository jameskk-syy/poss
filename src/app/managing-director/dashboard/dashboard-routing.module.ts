import { Page404Component } from "./../../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { MatTableModule } from "@angular/material/table";
import { ManageRoutesComponent } from "src/app/staff/sales/pages/manage-routes/manage-routes.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full",
  },
  {
    path: "main",
    component: MainComponent,
  },
  {
    path: "records",
    component: ManageRoutesComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes),
    MatTableModule,
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
