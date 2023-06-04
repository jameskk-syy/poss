import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageCustomersComponent } from '../manage-customers/manage-customers.component';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.sass']
})
export class ViewCustomerComponent implements OnInit {

  customerForm: FormGroup;
  customerName: any
  loading = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ManageCustomersComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.customerName = this.data.customer.firstname + " " + this.data.customer.lastname
    this.customerForm = this.customerDetailsForm();
  }

  customerDetailsForm(): FormGroup {
    return this.fb.group({

      firstname: [this.data.customer.firstname, [Validators.required]],
      lastname: [this.data.customer.lastname, [Validators.required]],
      route: [this.data.customer.route, [Validators.required]],
      contact: [this.data.customer.contact, [Validators.required]],
      address: [this.data.customer.address, [Validators.required]],
      status: [this.data.customer.status, [Validators.required]],
    });
  }

  onCancel(){
    this.dialogRef.close();
  }

}
