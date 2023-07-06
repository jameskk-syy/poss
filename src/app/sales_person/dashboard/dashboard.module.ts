import { NgModule } from "@angular/core";
import { MainComponent } from "./main/main.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "src/app/shared/shared.module";
import { AddProductSaleComponent } from "./main/add-product-sale/add-product-sale.component";
import { ComponentsModule } from "src/app/shared/components/components.module";

@NgModule({
    declarations:[
        MainComponent,
        AddProductSaleComponent
    ],
    imports:[
        DashboardRoutingModule,
        MatIconModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,
        MatDialogModule,
        SharedModule,
        ComponentsModule
    ],
    exports:[],
    providers:[]
})
export class SalesPersonDashboardModule{}