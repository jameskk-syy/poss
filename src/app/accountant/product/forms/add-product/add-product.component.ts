import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ProductService } from '../../product.service';
import { ProductManagementComponent } from '../../product-management/product-management.component';
import { statusArray } from 'src/app/core/models/status';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass']
})
export class AddProductComponent implements OnInit {

  loading = false;
  isLoading = false;
  subscription!: Subscription;
  statuses = statusArray;
  title:string
  productForm: FormGroup;
  categories: any;
  isdata: boolean;
  selectedCategory: any;
  catId: any


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
    this.productForm = this.fb.group({
      
      name: ['', Validators.required],
      category: ['',Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      createdBy: ['',],
      updatedBy: ['',]
    });

    this.getCategoryData()
  }


  onSubmit() {
    
    const selectedCategory = this.productForm.value.category;
      console.log('cjj', selectedCategory);
      if (selectedCategory && selectedCategory.id) {
        const categoryId = selectedCategory.id;

      this.subscription = this.service.addProduct(this.productForm.value, categoryId).subscribe(res => {
        this.loading = false;
        console.log ('jhdjh', this.productForm )
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.productForm.reset();
        this.dialogRef.close();
      }, err => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", errorMessage);
        this.dialogRef.close();
      });
    }
    }
  

  onClick() {
    this.dialogRef.close();
  }

  getCategoryData() {
    this.isLoading = true;
    this.subscription = this.service.getCategories().subscribe(res => {
        this.categories = res.entity
    }, error => {
        this.isLoading = false;
        console.error('Error fetching categories:', error);
    });
}

}
