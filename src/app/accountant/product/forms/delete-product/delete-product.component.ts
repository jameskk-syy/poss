import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../product.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductManagementComponent } from '../../product-management/product-management.component';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.sass']
})
export class DeleteProductComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductManagementComponent>,
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
    const productId = this.data.product.id

    console.log (productId)

    this.subscription = this.service.deleteProduct(productId).subscribe(res => {
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




