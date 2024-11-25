import { Component, Inject, OnInit } from '@angular/core';
import { ViewLubesPurchaseComponent } from '../view-lubes-purchase/view-lubes-purchase.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { Subscription } from 'rxjs';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-create-lubes-purchase',
  templateUrl: './create-lubes-purchase.component.html',
  styleUrls: ['./create-lubes-purchase.component.sass']
})
export class CreateLubesPurchaseComponent implements OnInit {

  loading = false;
  lubesPurchaseForm : FormGroup;
  subscription!: Subscription;
  title:string;
  vehicleTypes: any;
  products:any;
  locations:any;
  vendors:any;
  lubesTypes:any;

  constructor(
    public dialogRef: MatDialogRef<ViewLubesPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private purchasesService:PurchasesService
  ) 
    { }


  ngOnInit(): void {
    this.lubesPurchaseForm = this.fb.group({
      vendor:['', Validators.required],
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
      this.lubesPurchaseForm.patchValue({
        name: this.data.location.name,
        department: this.data.location.department
      });
      this.title = 'Edit Location';
    } else {
      this.title = 'Add Location'; 
    }
  }

  onSubmit() {
    
    const selectedCategory = this.lubesPurchaseForm.value.category;
      console.log('cjj', selectedCategory);
      if (selectedCategory && selectedCategory.id) {
        const categoryId = selectedCategory.id;

      this.subscription = this.purchasesService.createFuelPurchase(this.lubesPurchaseForm.value).subscribe({
        next: (res) => {
        this.loading = false;
        console.log ('jhdjh', this.lubesPurchaseForm )
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.lubesPurchaseForm.reset();
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
