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
      categoryCode: ['', Validators.required],
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      createdBy: ['',Validators.required],
      updatedBy: ['',Validators.required]

    });
  }

  onSubmit() {

    if (this.categoryForm.invalid) {
      return;  
    }

    this.loading = true;
    this.subscription = this.service.addNewCategory(this.categoryForm.value).subscribe(res => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.categoryForm.reset();
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

}

