import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchasesService } from '../../purchases.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ViewPurchaseComponent } from '../view-purchase/view-purchase.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.sass']
})
export class CreatePurchaseComponent implements OnInit {

  loading = false;
  fuelPurchaseForm : FormGroup;
  subscription!: Subscription;
  title:string;
  vehicleTypes: any;
  products:any;
  locations:any;
  vendors:any;

  constructor(
    public dialogRef: MatDialogRef<ViewPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private purchasesService:PurchasesService
  ) 
    { }


  ngOnInit(): void {
    this.fuelPurchaseForm = this.fb.group({
      vendor:['',Validators.required],
      vehicleType: ['', Validators.required],
      registration:['',Validators.required],
      driver: ['', Validators.required],  
      driverContact:['', Validators.required],
      product:['',Validators.required],
      quantity:['', Validators.required],
      pricePerLitre:['',Validators.required]

    });

    console.log('Action:', this.data.action);

    if (this.data.action === 'edit') {
      this.fuelPurchaseForm.patchValue({
        name: this.data.location.name,
        department: this.data.location.department
      });
      this.title = 'Edit Location';
    } else {
      this.title = 'Add Location'; 
    }
  }

  onSubmit() {
    
    const selectedCategory = this.fuelPurchaseForm.value.category;
      console.log('cjj', selectedCategory);
      if (selectedCategory && selectedCategory.id) {
        const categoryId = selectedCategory.id;

      this.subscription = this.purchasesService.createFuelPurchase(this.fuelPurchaseForm.value).subscribe({
        next: (res) => {
        this.loading = false;
        console.log ('jhdjh', this.fuelPurchaseForm )
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.fuelPurchaseForm.reset();
        this.dialogRef.close();
        }, 
      error: (err) => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", errorMessage);
        this.dialogRef.close();
        }
      }
    )
  }
  }

  onClick() {
  this.dialogRef.close();
  }


}
