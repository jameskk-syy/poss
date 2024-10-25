import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { SkuComponent } from './sku/sku.component';
import { AddProductComponent } from './forms/add-product/add-product.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AddCategoryComponent } from './forms/add-category/add-category.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/shared/material.module';
import { DeleteCategoryComponent } from './forms/delete-category/delete-category.component';
import { DeleteProductComponent } from './forms/delete-product/delete-product.component';
import { DeleteSkuComponent } from './forms/delete-sku/delete-sku.component';
import { AddSkuComponent } from './forms/add-sku/add-sku.component';
import { EditSkuComponent } from './forms/edit-sku/edit-sku.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './forms/edit-product/edit-product.component';
// import { WarehouseLookupComponent } from '../lookups/warehouse-lookup/warehouse-lookup.component';




@NgModule({
  declarations: [
    CategoryComponent,
    ProductsComponent,
    SkuComponent,
    AddProductComponent,
    ProductManagementComponent,
    AddCategoryComponent,
    DeleteCategoryComponent,
    DeleteProductComponent,
    DeleteSkuComponent,
    AddSkuComponent,
    EditSkuComponent,
    EditProductComponent,
    // WarehouseLookupComponent
   
  ],
  imports: [
    CommonModule,
    ProductRoutingModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableExporterModule,
    SharedModule,
    ComponentsModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule, 
    MatSelectModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
