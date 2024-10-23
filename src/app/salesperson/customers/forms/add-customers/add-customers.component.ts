import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CustomerComponent } from '../../customer/customer.component';
import { CustomersService } from '../../customers.service';
import { statusArray } from 'src/app/core/models/status';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/accountant/customer/customer.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.sass']
})
export class AddCustomersComponent implements OnInit {


  isLoading:Boolean = false;
  loading: boolean = false;
  categories: any;
  customerForm: FormGroup;
  salespersonId: any;
  statuses = statusArray;
  subscription!: Subscription;
  
 

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenStorageService :TokenStorageService,
    private customerService: CustomersService,
    private customerCategoryService: CustomerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<CustomerComponent>,
  ) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      category: ['',Validators.required],
      name: ['',Validators.required],
      phone: ['', Validators.required],
      alternativePhone: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],

    })

    this.fetchCustomerCategory();
  }


  fetchCustomerCategory(){
    this.isLoading = true;
    this.subscription = this.customerCategoryService.fetchCategory().subscribe({
      next:(res) => {
        this.data = res
        this.categories= this.data.entity
        console.log('customer category', this.categories)
      },
      error: (err) => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", err);
      }
      })
  }

  onSubmit() {
    
    const selectedCategory = this.customerForm.value.category;
      console.log('cjj', selectedCategory);
      if (selectedCategory && selectedCategory.id) {
        const categoryId = selectedCategory.id;

      this.subscription = this.customerService.addCustomer(categoryId,this.customerForm.value ).subscribe({
        next: (res) => {
        this.loading = false;
        console.log ('jhdjh', this.customerForm )
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

  onClick() {
    this.dialogRef.close();
  }
  
  }

