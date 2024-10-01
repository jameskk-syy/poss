import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageCustomersComponent } from '../../manage-customers/manage-customers.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CustomerService } from '../../customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.sass']
})
export class UpdateCustomerComponent implements OnInit {

  customerUpdateForm: FormGroup
  pLoading: boolean = false
  isLoading: boolean = false
  subscription: Subscription
  routes: any
  selectedStatus: any
  customerType: any[] = ["CREDIT", "CASH", "DEBIT", "WALKIN"]


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ManageCustomersComponent>,
    private dialog: MatDialog,
    private customerService: CustomerService,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log("These are customer details for upload", this.data.customer),
      this.customerUpdateForm = this.customerDetailsForm()

    this.getRoutes()
  }

  statusOptions = [
    { value: 'Active', viewValue: 'Active' },
    { value: 'Inactive', viewValue: 'Active' },
    { value: 'Deleted', viewValue: 'Deleted' },
  ];

  customerDetailsForm(): FormGroup {
    return this.fb.group({

      firstname: [this.data.customer.firstname, [Validators.required]],
      lastname: [this.data.customer.lastname, [Validators.required]],
      customerType: [this.data.customer.customerType, [Validators.required]],
      contact: [this.data.customer.contact, [Validators.required]],
      address: [this.data.customer.address, [Validators.required]],
      customerNO: [this.data.customer.customerNO, [Validators.required]],
      id: [this.data.customer.id],
      createdAt: [this.data.customer.createdAt],
      status: [this.data.customer.status, [Validators.required]],
      updateOn: [this.data.customer.updatedOn],
      deletedOn: [this.data.customer.deletedOn],
      deleteFlag: [this.data.customer.deleteFlag]
    });
  }

  getRoutes() {
    this.pLoading = true
    this.subscription = this.customerService.fetchRoutes().subscribe((res) => {
      if (res.entity.length > 0) {
        this.pLoading = false
        this.routes = res.entity;

        console.log("Routes ", this.routes)
      } else {
        this.pLoading = false
        this.routes = [];
      }
    });
  }

  onSubmit() {
    console.log("Customer Details Update", this.customerUpdateForm.value)
    this.isLoading = true
    this.subscription = this.customerService.updateCustomer(this.customerUpdateForm.value).subscribe(
      (res) => {
        this.isLoading = false
        this.snackbar.showNotification("snackbar-success", "Successful!");
        this.dialogRef.close();
      },
      (err) => {
        this.isLoading = false
        this.snackbar.showNotification("snackbar-danger", err);
        this.dialogRef.close();
      }
    )
  }

  onCancel() {
    this.dialogRef.close()
  }

}
