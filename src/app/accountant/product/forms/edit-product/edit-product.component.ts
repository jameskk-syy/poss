import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ProductService } from '../../product.service';
import { ProductManagementComponent } from '../../product-management/product-management.component';
import { statusArray } from 'src/app/core/models/status';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit {
  
  loading = false;
  isLoading = false;
  subscription!: Subscription;
  statuses = statusArray;
  title:string
  productForm: FormGroup;
  categories: any;
  isdata: boolean;
  selectedCategory: any;

  constructor(
    public dialogRef: MatDialogRef<ProductManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private service:ProductService
  ) 
    { }

  ngOnInit(): void {
    this.getCategoryData()

    this.productForm = this.fb.group({
        code: ['', Validators.required],
        name: ['', Validators.required],
        category: ['',Validators.required],
        description: ['', Validators.required],
        status: ['', Validators.required],
        createdBy: ['',],
        updatedBy: ['',]
      });

    
      if(this.data && this.data.product){

    this.productForm.patchValue({
        code: this.data.product.code,
        name: this.data.product.name,
        category: this.data.product.category.id,
        description: this.data.product.description,
        status: this.data.product.status,
      });

      console.log('dfhkjdf', this.data.product.category.name)
    }
  }

 

  updateProduct() {
    this.loading = true;
    this.subscription = this.service.updateProduct(this.data.product, this.data.product.id).subscribe(res => {
      this.loading = false;
      const successMessage = res.message
      this.snackbar.showNotification("snackbar-success", successMessage);
      this.dialogRef.close(true);  
    }, err => {
      this.loading = false;
      const errorMessage = err.message
      this.snackbar.showNotification("snackbar-danger", errorMessage);
    });
  }

  getCategoryData() {
    this.isLoading = true;
    this.subscription = this.service.getCategories().subscribe(res => {
        this.categories = res.entity
        console.log("catergotis n prod", this.categories)
    
    }, error => {
        this.isLoading = false;
        console.error('Error fetching categories:', error);
    });
}
  

  onClick() {
    this.dialogRef.close();
  }

}
