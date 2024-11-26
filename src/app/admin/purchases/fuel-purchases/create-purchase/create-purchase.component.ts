import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchasesService } from '../../purchases.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ViewPurchaseComponent } from '../view-purchase/view-purchase.component';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.sass']
})
export class CreatePurchaseComponent implements OnInit {

  loading = false;
  fuelPurchaseForm : FormGroup;
  vehicleForm:FormGroup
  subscription!: Subscription;
  title:string;
  transporters: any;
  products:any;
  locations:any;
  vendors:any;
  tanks:any;
  isLinear: any;
  fuelPurchases: any;

  productDataSource = new MatTableDataSource<any>([]);
  productDisplayedColumns = [
    'product',
    'tank',
    'intialReading',
    'quantityDispersed',
    'currentReading',
    'actions'
  ];

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
    this.vehicleForm = this.fb.group({
      vendor:['',Validators.required],
      transporter: ['', Validators.required],
      registration:['',Validators.required],
      driver: ['', Validators.required],  
      driverContact:['', Validators.required],
      invoiceNo:['', Validators.required],
    });

    this.fuelPurchaseForm = this.fb.group({
      product:['',Validators.required],
      tank:['', Validators.required],
      intialReading:['',Validators.required],
      quantityDispersed:['', Validators.required],
      currentReading:['', Validators.required],
      deviation:['',Validators.required],
      amount:['',Validators.required]

    })

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

  addFuelPurchase(){

  }
  addPurchase() {
    if (this.fuelPurchaseForm.valid) {
      const purchaseData = this.fuelPurchaseForm.value;
      this.productDataSource.data = [...this.productDataSource.data, purchaseData];
      this.fuelPurchaseForm.reset();
    }
  }

  removeItem(index: number) {
    const data = this.productDataSource.data;
    data.splice(index, 1);
    this.productDataSource.data = [...data];
  }


}
