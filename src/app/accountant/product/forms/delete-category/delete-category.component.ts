import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../product.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryComponent } from '../../category/category.component';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.sass']
})
export class DeleteCategoryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: ProductService) { }

  name: any;
  desc: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    
  }

  onDelete() {
    this.loading = true;
    const categoryId = this.data.category.id

    this.subscription = this.service.deleteCategory(categoryId).subscribe(res => {
      this.loading = false;
      const successMessage = res.message
      this.snackbar.showNotification("snackbar-success", successMessage);
      this.dialogRef.close();
    }, err => {
      this.loading = false;
      const errorMessage = err.message
      this.snackbar.showNotification("snackbar-danger", errorMessage);
      this.dialogRef.close();
    })
  }

  onClick() {
    this.dialogRef.close();
  }

}


