import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PriceManagementComponent } from '../../price-management/price-management.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { PriceService } from '../../price.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.sass']
})
export class UpdatePriceComponent implements OnInit {

  priceUpdateForm: FormGroup
  pLoading: boolean = false
  isLoading: boolean = false
  subscription: Subscription
  routes: any
  selectedStatus: any

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PriceManagementComponent>,
    private dialog: MatDialog,
    private priceService: PriceService,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log("These are price details for upload", this.data.price),
      this.priceUpdateForm = this.priceDetailsForm()

    this.getRoutes()
  }

  statusOptions = [
    { value: 'Active', viewValue: 'Active' },
    { value: 'Inactive', viewValue: 'Active' },
    { value: 'Deleted', viewValue: 'Deleted' },
  ];

  priceDetailsForm(): FormGroup {
    return this.fb.group({

      from: [this.data.price.fromDate, [Validators.required]],
      price: [this.data.price.price, [Validators.required]],
      to:  [this.data.price.toDate, [Validators.required]],
      status: [this.data.price.status, [Validators.required]],
    });
  }

  getRoutes() {
    this.pLoading = true
    this.subscription = this.priceService.fetchRoutes().subscribe((res) => {
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
    console.log("Price Details Update", this.priceUpdateForm.value)
    this.isLoading = true

    const priceId = this.data.price.id; 

    this.subscription = this.priceService.updatePrice(priceId, this.priceUpdateForm.value).subscribe(
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

