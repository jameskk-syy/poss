import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PriceService } from '../../price.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { PriceManagementComponent } from '../../price-management/price-management.component';
import { DatePipe } from '@angular/common'; 
import { statusArray } from 'src/app/core/models/status';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.sass']
})
export class AddPriceComponent implements OnInit {

  priceRegistrationForm: FormGroup
  subscription!: Subscription;
  isLoading: boolean = false
  pLoading: boolean = false
  statuses = statusArray;

  routes: any
 
  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    private priceService: PriceService,
    public dialogRef: MatDialogRef<PriceManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
 
    this.priceRegistrationForm = this.fb.group({
      from: [`${this.datePipe.transform(new Date(), 'YYYY-MM-dd', 'EAT')}`, [Validators.required]],
      price: ['', [Validators.required]],
      status: ['', [Validators.required]],
      to:  [`${this.datePipe.transform(new Date(), 'YYYY-MM-dd', 'EAT')}`, [Validators.required]],
              });

    this.getRoutes()
  }
   
  onSubmit() {

    this.isLoading = true

    this.subscription = this.priceService.addPrice(this.priceRegistrationForm.value)
      .subscribe((res) => {
        this.snackBar.showNotification('snackbar-success', 'Successful!');
        this.isLoading = false;
        this.priceRegistrationForm.reset();
        this.dialogRef.close();
      },
        (err) => {
          this.isLoading = false;
          this.snackBar.showNotification('snackbar-danger', err);
               })

  }

  onCancel() {
    this.dialogRef.close()
  }

  getRoutes() {
    this.pLoading = true
    this.subscription = this.priceService.fetchRoutes().subscribe((res) => {
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

