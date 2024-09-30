import { Component, Inject, OnInit } from '@angular/core';
import { PriceManagementComponent } from '../../price-management/price-management.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { PriceService } from '../../price.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-price',
  templateUrl: './delete-price.component.html',
  styleUrls: ['./delete-price.component.sass']
})
export class DeletePriceComponent implements OnInit {

  price: any
  isloading: boolean = false

  subscription: Subscription

  constructor(
    public dialogRef: MatDialogRef<PriceManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private priceService: PriceService
  ) { }

  ngOnInit(): void {
    this.price = `Price: ${this.data.price.price}, Code: ${this.data.price.code}`;
  }

  onDelete(){
    this.subscription = this.priceService.deletePrice(this.data.price.id)
    .subscribe((res)=> {
      this.isloading = true;
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.dialogRef.close();
    },
    (err)=> {
      this.isloading = false;
      this.snackbar.showNotification("snackbar-danger", err);
      this.dialogRef.close();
    })
  }

  onCancel(){
    this.dialogRef.close()
  }

}
