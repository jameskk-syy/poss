import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainComponent } from '../main/main.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-warehouse-del',
  templateUrl: './warehouse-del.component.html',
  styleUrls: ['./warehouse-del.component.scss']
})
export class WarehouseDelComponent implements OnInit {
  warehouse: any
  loading: boolean = false
  constructor(private service: WarehouseService,private snackbar: SnackbarService,@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<MainComponent>) { }

  ngOnInit(): void {
    this.warehouse = this.data.wh
  }

  close() {
    this.dialogRef.close()
  }

  submit() {
    this.loading = true
    this.service.delete(this.data.wh.id).subscribe({
      next: (res) => {
        if (res.statusCode == 200) {
          this.loading = false

          this.dialogRef.close()
          this.snackbar.showNotification('snackbar-success', res.message)
        } else {
          this.loading = false
          this.snackbar.showNotification('snackbar-danger', res.message)
        }
      },
      error: (err) => {
        console.log(err)
        this.snackbar.showNotification('snackbar-danger', err)
      },
      complete: () => {}
    })
  }

}
