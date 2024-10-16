import { Component, Inject, OnInit } from '@angular/core';
import { StockService } from '../../stock/stock.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TransferWarehouseComponent } from '../transfer-warehouse/transfer-warehouse.component';

@Component({
  selector: 'app-confirm-transfer',
  templateUrl: './confirm-transfer.component.html',
  styleUrls: ['./confirm-transfer.component.sass']
})
export class ConfirmTransferComponent implements OnInit {

  warehouse:any;
  loading: boolean = false
  constructor(private service: StockService,private snackbar: SnackbarService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<TransferWarehouseComponent>) { }

  ngOnInit(): void {
    this.warehouse = this.data.formData
    console.log('Received Data:', this.data.formData);
  }

  close() {
    this.dialogRef.close()
  }
  submit() {
    this.loading = true;

    this.service.transferWarehouse(this.warehouse).subscribe({
      next: (res) => {
          this.loading = false;

          console.log(res);

          if(res.statusCode == 200 || res.statusCode == 201){
            this.dialogRef.close()
            this.snackbar.showNotification('snackbar-success', res.message)

           }else {
            this.loading = false;
            this.snackbar.showNotification('snackbar-danger', res.message)
          }
      },
      error: (err) => {
        this.loading = false;
          console.log(err)
          this.snackbar.showNotification('snackbar-danger', err)
        },
      complete: () => {}
    })

       
  }

}

