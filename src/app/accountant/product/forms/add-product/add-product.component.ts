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
      code: ['', Validators.required],
      name: ['', Validators.required],
      category: ['',Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      createdBy: ['',],
      updatedBy: ['',]
    });

    console.log('Action:', this.data.action);
    this.getCategoryData()
    this.onSubmit
  

    if (this.data.action === 'edit') {
      this.productForm.patchValue({
        code: this.data.product.code,
        name: this.data.product.name,
        category: this.data.product.category,
        description: this.data.product.description,
        status: this.data.product.status,
      });
      this.title = 'Edit Product';
    } else {
      this.title = 'Add New Product'; 
    }
  }


  onSubmit() {
    if (this.productForm.invalid) {
      return;  
    }

    this.loading = true;
    console.log('Form action:', this.data.action); 
    console.log('Action:', this.data.action);

    // Call update method if editing
    if (this.data.action === 'edit') {
      console.log('Editing product, calling updateProduct()');
      this.updateProduct();
    } else {

      const selectedCategory = this.productForm.value.category;
      console.log('cjj', selectedCategory);
      // const categoryId = this.selectedCategory.id;
      if (selectedCategory && selectedCategory.id) {
        const categoryId = selectedCategory.id;

        console.log ('this id',categoryId)
        console.log ('this id',this.productForm.value)

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

  

  onClick() {
    this.dialogRef.close();
  }



  getCategoryData() {
    this.isLoading = true;
    this.subscription = this.service.getCategories().subscribe(res => {
        this.data = res;
        console.log('categories are here', this.data);
        this.categories = this.data.entity.map((item:any) =>item)
        console.log('category name', this.categories)
    }, error => {
        this.isLoading = false;
        console.error('Error fetching categories:', error);
    });
}

}
