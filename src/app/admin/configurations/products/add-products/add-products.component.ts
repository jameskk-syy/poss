import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsComponent } from '../products/products.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ConfigurationsService } from '../../configurations.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.sass']
})
export class AddProductsComponent implements OnInit {

  loading = false;
  productForm : FormGroup;
  subscription!: Subscription;
  title:string;
  departments: any;
  locations:any;

  constructor(
    public dialogRef: MatDialogRef<ProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private configurationsService:ConfigurationsService
  ) 
    { }


  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      department:['',Validators.required],
      location: ['', Validators.required]    
    });

    console.log('Action:', this.data.action);

    if (this.data.action === 'edit') {
      this.productForm.patchValue({
        name: this.data.location.name,
        department: this.data.location.department
      });
      this.title = 'Edit Location';
    } else {
      this.title = 'Add Location'; 
    }
  }

  onSubmit() {
    
    const selectedCategory = this.productForm.value.category;
      console.log('cjj', selectedCategory);
      if (selectedCategory && selectedCategory.id) {
        const categoryId = selectedCategory.id;

      this.subscription = this.configurationsService.addProduct(this.productForm.value).subscribe({
        next: (res) => {
        this.loading = false;
        console.log ('jhdjh', this.productForm )
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.productForm.reset();
        this.dialogRef.close();
        }, 
      error: (err) => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", errorMessage);
        this.dialogRef.close();
        }
      }
    )
  }
}
  


  getDepartmentData() {
    this.loading = true;
    this.subscription = this.configurationsService.getDepartments().subscribe(res => {
        this.departments= res.entity
    }, error => {
        this.loading = false;
        console.error('Error fetching categories:', error);
    });
}

onClick() {
  this.dialogRef.close();
}

}
