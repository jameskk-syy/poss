import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageCustomersComponent } from '../manage-customers/manage-customers.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomersService } from '../services/customers.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.sass']
})
export class AddCustomerComponent implements OnInit {

  customerRegistrationForm: FormGroup
  subscription!: Subscription;
  isLoading: boolean = false
  pLoading: boolean = false

  routes: any

  constructor(
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    private customerService: CustomersService,
    public dialogRef: MatDialogRef<ManageCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {


    this.customerRegistrationForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      address: ['', [Validators.required]],
      routeFk: ['', [Validators.required]],
    });

    this.getRoutes()
  }


  onSubmit() {

    this.isLoading = true

    this.subscription = this.customerService.addCustomer(this.customerRegistrationForm.value)
      .subscribe((res) => {
        this.snackBar.showNotification('snackbar-success', 'Successful!');
        this.isLoading = false;
        this.customerRegistrationForm.reset();
        this.dialogRef.close();
      },
        (err) => {
          this.isLoading = false;
          this.snackBar.showNotification('snackbar-danger', err);
          this.dialogRef.close();
        })

  }

  onCancel() {
    this.dialogRef.close()
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

}
