import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../product.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SkuComponent } from '../../sku/sku.component';
@Component({
  selector: 'app-delete-sku',
  templateUrl: './delete-sku.component.html',
  styleUrls: ['./delete-sku.component.sass']
})
export class DeleteSkuComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SkuComponent>,
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
    const skuId = this.data.sku.id

    console.log (skuId)

    this.subscription = this.service.deleteSku(skuId).subscribe(res => {
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
