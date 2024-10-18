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

  customerRegistrationForm: FormGroup;
  subscription!: Subscription;
  isLoading: boolean = false;
  pLoading: boolean = false;
  categories: any[] = []; 
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
      phone: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });

    this.getRoutes();
    this. getCategoryData();
  }

  getCategoryData() {
    this.isLoading = false;
    this.subscription = this.customerService.fetchCategory()
    .subscribe({
      next:(res) => {
        this.data = res;
        console.log('categories are here', this.data);
        this.categories = this.data.entity.map((item:any) =>item)
        console.log('category name', this.categories)
    }, error:(err) => {
        this.isLoading = false;
        console.error('Error fetching categories:', err);
    }
  });
}

onSubmit() {
  this.isLoading = true;

  const categoryId = this.customerRegistrationForm.get('category')?.value;
  console.log('Selected Category ID:', categoryId);

  this.subscription = this.customerService.addCustomer(categoryId, this.customerRegistrationForm.value)
    .subscribe({
      next: (res) => {
        this.snackBar.showNotification('snackbar-success', 'Successful!');
        this.isLoading = false;
        this.customerRegistrationForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {  
        this.isLoading = false;
        this.snackBar.showNotification('snackbar-danger', err);
      }
    });
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

