import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ProductSaleService } from '../service/product-sale.service';
import { ProductSalesManagementComponent } from '../product-sales-management/product-sales-management.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-sale',
  templateUrl: './add-product-sale.component.html',
  styleUrls: ['./add-product-sale.component.sass']
})
export class AddProductSaleComponent implements OnInit {
  productSalesAssignment: FormGroup
  subscription!: Subscription;
  
  isLoading: boolean = false
  pLoading: boolean = false

  routes: any
  customers: any
  salesPersons: any

  constructor(
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    private salesservice: ProductSaleService,
    public dialogRef: MatDialogRef<ProductSalesManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.productSalesAssignment = this.fb.group({
      customerFk: ['', [Validators.required]],
      productFk: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      routeFk: ['', [Validators.required]],
      salesPersonFk: [''],
    });

    this.getRoutes();
    this.getCustomers();
    this.getSalesPersons();
  }
  getRoutes() {
    this.pLoading = true
    this.subscription = this.salesservice.fetchRoutes().subscribe((res) => {
      if (res.entity && res.entity.length > 0) {
        this.pLoading = false
        this.routes = res.entity;
      } else {
        this.pLoading = false
        this.routes = [];
      }
    });
  }
  getCustomers() {
    this.pLoading = true
    this.subscription = this.salesservice.fetchCustomers().subscribe((res) => {
      if (res.entity.length > 0) {
        this.pLoading = false
        this.customers = res.entity;

      } else {
        this.pLoading = false
        this.customers = [];
      }
    });
  }

  getSalesPersons() {
    this.pLoading = true
    this.subscription = this.salesservice.fetchSalesPersons().subscribe((res) => {
      if (res.userData.length > 0) {
        this.pLoading = false
        this.salesPersons = res.userData;        

      } else {
        this.pLoading = false
        this.salesPersons = [];
      }
    });
  }

  onSubmit(){
    this.isLoading = true

    this.subscription = this.salesservice.addSale(this.productSalesAssignment.value)
      .subscribe((res) => {
        this.snackBar.showNotification('snackbar-success', 'Successful!');
        this.isLoading = false;
        this.productSalesAssignment.reset();
        this.dialogRef.close();
      },
        (err) => {
          console.log(err)
          this.isLoading = false;
          this.snackBar.showNotification('snackbar-danger', err);
          this.dialogRef.close();
        })
  }
  
  onCancel() {
    this.dialogRef.close()
  }

}
