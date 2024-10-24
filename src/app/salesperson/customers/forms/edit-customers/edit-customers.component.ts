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
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.sass']
})
export class EditCustomersComponent implements OnInit {

  isLoading:Boolean = false;
  loading: boolean = false;
  categories: any;
  customerForm: FormGroup;
  salespersonId: any;
  statuses = statusArray;
  subscription!: Subscription;
  isdata: boolean;
  loggedInUserId: string;
  customers: any;
  
 

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

    this.loggedInUserId = this.tokenStorageService.getUserId();
    this.getData();

    this.customerForm = this.fb.group({
      category: ['',Validators.required],
      name: ['',Validators.required],
      phone: ['', Validators.required],
      alt_phone: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],

    })

  
    if(this.data && this.data.customer){

  this.customerForm.patchValue({
      category: this.data.customer.category,
      name: this.data.customer.name,
      phone: this.data.customer.phone,
      alt_phone: this.data.customer.alt_phone,
      location:this.data.customer.location,
      address:this.data.customer.address,
      status: this.data.customer.status,
    });

    console.log('dfhkjdf', this.data.customer.category.name)
  }
  }

  getData(){
    this.isLoading = true;
    console.log(this.loggedInUserId)
    this.subscription = this.customerService.getCustomers(this.loggedInUserId).subscribe({
      next:(res) => {
        this.customers = res;
        this.isLoading = false;
        },
      
        error: (err) => {
          this.isLoading = false;
          console.error('Error fetching customer data:', err);
          this.isdata = false;
        }
    })
  }

  onSubmit() {
    
    const selectedCategory = this.data.customer.category.id;
      console.log('cjj', selectedCategory);

      const customerId = this.data.customer.id;
      console.log('oo', customerId)

      this.subscription = this.customerService.editCustomer(selectedCategory, customerId, this.customerForm.value ).subscribe({
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
  

  onClick(){
    this.dialogRef.close
  }

}
