import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CustomersComponent } from '../customers/customers.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ConfigurationsService } from '../../configurations.service';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.sass']
})
export class AddCustomersComponent implements OnInit {

  loading = false;
  customerForm : FormGroup;
  subscription!: Subscription;
  title:string

  constructor(
    public dialogRef: MatDialogRef<CustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private configurationsService:ConfigurationsService
  ) 
    { }


  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      contactPerson: ['', Validators.required],
      kraPin:['', Validators.required],
      physicalLocation:['', Validators.required]
      
    });

    console.log('Action:', this.data.action);

    if (this.data.action === 'edit') {
      this.customerForm.patchValue({
        name: this.data.customer.name,
        address: this.data.customer.address,
        phone: this.data.customer.phone,
        email: this.data.customer.email,
        contactPerson: this.data.customer.contactPerson,
        kraPin: this.data.customer.kraPin,
        physicalLocation:this.data.customer.physicalLocation,
      });
      this.title = 'Edit Customer';
    } else {
      this.title = 'Add Customer'; 
    }
  }


  onSubmit() {
    if (this.customerForm.invalid) {
      return;  
    }

    this.loading = true;

    // Call update method if editing
    if (this.data.action === 'edit') {
      this.updateCustomer();
    } else {
      // Add new category
      this.subscription = this.configurationsService.addCustomer(this.customerForm.value).subscribe({
        next: (res) => {
        this.loading = false;
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.customerForm.reset();
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
  }

  updateCustomer() {
    this.loading = true;
    this.subscription = this.configurationsService.updateCustomer(this.data.category).subscribe({
    next: (res) => {
      this.loading = false;
      const successMessage = res.message
      this.snackbar.showNotification("snackbar-success", successMessage);
      this.dialogRef.close(true);
      },
      error: (err) =>{
      this.loading = false;
      const errorMessage = err.message
      this.snackbar.showNotification("snackbar-danger", errorMessage);
      }

      })
    }

  onClick() {
    this.dialogRef.close();
  }


}
