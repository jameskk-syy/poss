import { Component, Inject, OnInit } from '@angular/core';
import { ManageCustomersComponent } from '../../manage-customers/manage-customers.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CustomerService } from '../../customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-approve-customer',
  templateUrl: './approve-customer.component.html',
  styleUrls: ['./approve-customer.component.sass']
})
export class ApproveCustomerComponent implements OnInit {

  customer: any
  isloading: boolean = false

  subscription: Subscription

  constructor(
    public dialogRef: MatDialogRef<ManageCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customer = this.data.customer.id;
    console.log(this.customer)
  }

  onApprove() {
    this.isloading = true;
    this.subscription = this.customerService.approveCustomer(this.customer).subscribe({
      next: (res) => {
        this.isloading = false;
        const successMessage = res.message;
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.dialogRef.close();
      },
      error: (err) => {
        this.isloading = false;
        const errorMessage = err.message;
        this.snackbar.showNotification("snackbar-danger", errorMessage);
        this.dialogRef.close();
      }
    });
  }
  
  onCancel(){
    this.dialogRef.close()
  }

}
