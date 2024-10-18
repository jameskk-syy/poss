import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ProductService } from '../../product.service';
import { CategoryComponent } from '../../category/category.component';
import { statusArray } from 'src/app/core/models/status';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnInit {

  loading = false;
  categoryForm: FormGroup;
  subscription!: Subscription;
  statuses = statusArray;
  title:string

  constructor(
    public dialogRef: MatDialogRef<CategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private service:ProductService
  ) 
    { }


  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      code: ['', ],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      
    });

    console.log('Action:', this.data.action);

    if (this.data.action === 'edit') {
      this.categoryForm.patchValue({
        code: this.data.category.code,
        name: this.data.category.name,
        description: this.data.category.description,
        status: this.data.category.status,
      });
      this.title = 'Edit Category';
    } else {
      this.title = 'Add New Category'; 
    }
  }


  onSubmit() {
    if (this.categoryForm.invalid) {
      return;  
    }

    this.loading = true;

    // Call update method if editing
    if (this.data.action === 'edit') {
      this.updateCategory();
    } else {
      // Add new category
      this.subscription = this.service.addNewCategory(this.categoryForm.value).subscribe({
        next: (res) => {
        this.loading = false;
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.categoryForm.reset();
        this.dialogRef.close();
        },  
        error: (err) => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", errorMessage);
        this.dialogRef.close();
        }
    })
    }
  }

  updateCategory() {
    this.loading = true;
    this.subscription = this.service.updateCategory(this.data.category, this.data.category.id).subscribe({
    next: (res) => {
      this.loading = false;
      const successMessage = res.message
      this.snackbar.showNotification("snackbar-success", successMessage);
      this.dialogRef.close(true);
      },
      error: (err) =>{
      this.loading = false;
      const errorMessage = err.message
      this.snackbar.showNotification("snackbar-danger", errorMessage);
      }

      })
    }

  onClick() {
    this.dialogRef.close();
  }

}

