import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageCustomersComponent } from '../../manage-customers/manage-customers.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../customer.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { statusArray } from 'src/app/core/models/status';
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
  customerType: any[] = ["CREDIT", "CASH", "DEBIT", "WALKIN"]
  statuses = statusArray;

  routes: any

  constructor(
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<ManageCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {


    this.customerRegistrationForm = this.fb.group({
      alt_phone: ['', [Validators.required]],
      location: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      status: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });

    this.getRoutes()
  }


  onSubmit() {

    this.isLoading = true

    this.subscription = this.customerService.addCustomer(this.data.customer.id, this.customerRegistrationForm.value)
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

      } else {
        this.pLoading = false
        this.routes = [];
      }
    });
  }

}

