import { Component, Inject, OnInit } from '@angular/core';
import { ManageCustomersComponent } from '../manage-customers/manage-customers.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.sass']
})
export class DeleteCustomerComponent implements OnInit {

  customer: any

  constructor(
    public dialogRef: MatDialogRef<ManageCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private customerService: CustomersService
  ) { }

  ngOnInit(): void {
  }

}
