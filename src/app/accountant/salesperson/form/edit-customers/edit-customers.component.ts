import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ManageSpCustomersComponent } from '../../manage-sp-customers/manage-sp-customers.component';
import { SalespersonService } from '../../salesperson.service';
import { error } from 'console';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.sass']
})
export class EditCustomersComponent implements OnInit {
  loading: boolean;
  subscription!: Subscription;
  customer: any;
  salesPersonId:any;

  constructor(
    public dialogRef: MatDialogRef<ManageSpCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private salespersonService:SalespersonService
  ) { }

  ngOnInit(): void {
  }

  removeCustomer(){
    this.loading = true;
    const customerId = this.data.customer.id

    this.salesPersonId = this.data.salesPersonId

    console.log('cust', customerId)
    console.log('sales', this.salesPersonId)

    this.subscription = this.salespersonService.removeCustomer(this.salesPersonId, customerId).subscribe({
      next: (res) => {
        this.loading = false;
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
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

  onClick(){
    this.dialogRef.close();
  }
}
