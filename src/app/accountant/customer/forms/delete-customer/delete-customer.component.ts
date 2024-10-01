import { Component, Inject, OnInit } from '@angular/core';
import { ManageCustomersComponent } from '../../manage-customers/manage-customers.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CustomerService } from '../../customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.sass']
})
export class DeleteCustomerComponent implements OnInit {
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
    this.customer = this.data.customer.firstname + " " + this.data.customer.lastname
  }

  onDelete(){
    this.subscription = this.customerService.deleteCustomer(this.data.customer.id)
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
