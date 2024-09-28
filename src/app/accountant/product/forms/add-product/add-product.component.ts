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
  productForm: FormGroup;
  subscription!: Subscription;
  statuses = statusArray;
  isdata: boolean = false;
  isLoading:boolean = false;
  roles:any;
  categories: any[] = [];

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
      productCode: ['', Validators.required],
      productName: ['', Validators.required],
      category: ['',Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      createdBy: ['',Validators.required],
      updatedBy: ['',Validators.required]

    });
  }

  onSubmit() {

    if (this.productForm.invalid) {
      return;  
    }

    this.loading = true;
    this.subscription = this.service.addProduct(this.productForm.value).subscribe(res => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.productForm.reset();
      this.dialogRef.close();
    }, err => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-danger", err);
      this.dialogRef.close();
    })
  }

  onClick() {
    this.dialogRef.close();
  }

  getCategoryData() {
    this.isLoading = true;
    this.subscription = this.service.getCategories().subscribe(res => {
        this.data = res;
        console.log('categories are here', this.data);
        if (this.data.entity && this.data.entity.length > 0) {
            this.categories = this.data.entity.map((item: any) => {
                return {
                    id: item.id,
                };
            });
            this.isLoading = false;
            this.isdata = true;
            console.log('Mapped Categories:', this.categories); 
        } else {
            this.isdata = false;
            this.categories = []; 
            console.log('No categories found');
        }
    }, error => {
        this.isLoading = false;
        console.error('Error fetching categories:', error);
    });
}

}