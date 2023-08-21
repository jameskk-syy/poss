import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalesService } from '../../services/sales.service';
import { Subscription } from 'rxjs';
import { ProductsAllocationComponent } from '../products-allocation/products-allocation.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-advance-details',
  templateUrl: './advance-details.component.html',
  styleUrls: ['./advance-details.component.sass']
})
export class AdvanceDetailsComponent implements OnInit {
  [x: string]: any;
  advancePaymentForm: FormGroup;
  loading = false;
  isLoading: Boolean
  isdata: Boolean
  farmer: any;
  Name: any;

  constructor(public dialogRef:MatDialogRef<ProductsAllocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private service: SalesService,
    private snackbar: SnackbarService, ) { }
subscription!: Subscription;

  ngOnInit(): void {
    this.isLoading = true;
    this.advancePaymentForm = this.fb.group({
      farmerNo: ['',Validators.required],
<<<<<<< HEAD
      // username: ['',Validators.required],
=======
      username: ['',Validators.required],
>>>>>>> 28cf69070a46ac567c687af2f3265e7950660e7e
      // mobileNo: ['',Validators.required],
      paymentMode: ['',Validators.required],
    //  route: ['',Validators.required],
    //   memberType: ['',Validators.required],
      advanceAmount: ['',Validators.required],
      date: ['',Validators.required],

    });
// this.getRoutes();   

  
  //   this.service.getFarmersByFarmerNumber(this.data.farmer.id).subscribe(res => {
  //     this.data = res;
  //     this.isLoading = false;
  //     this.farmer = this.data.entity 
  //     console.log("Advance details ", this.farmer)

  //     this.farmer.Name, [Validators.required],
  //     this.mobileNo,[Validators.required],

  //     this.getCollectionRoutes(this.farmer.farmer_Id)

  //     this.getMemberType(this.Farmer.farmer_Id)



  

  // });
  }
  // getCollectionRoutes(idNumber: any) {
  //   this.subscription = this.routesService.getCollectionRoutes().subscribe(res => {
  //     if (res.entity.length > 0) {
  //       this.routes = res.entity;
  //     }
  //     else {
  //       this.routes = [];
  //     }
  //   })
  // }
  // getRoutes() {
  //   this.subscription = this.service.getRoutes().subscribe(res => {
  //     console.log(res)
  //     if (res.entity.length > 0) {
  //       this.routes = res.entity;
  //     }
  //     else {
  //       this.routes = [];
  //     }
  //   })
  // }
  
  onSubmit() {
<<<<<<< HEAD
    this.loading = true;
    this.subscription = this.service.allocateAdvance(this.advancePaymentForm.value).subscribe(res => {
=======
    console.log(this.advancePaymentForm)
    this.loading = true;
    this.subscription = this.service.allocateAdvance(this.advancePaymentForm.value).subscribe(res => {
      // console.log(res)
>>>>>>> 28cf69070a46ac567c687af2f3265e7950660e7e
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.advancePaymentForm.reset();
      this.dialogRef.close();
    }, err => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-danger", err);
      this.dialogRef.close();
    })
  }

  onClick() {
    this.dialogRef.close();
  }
  


  
    
}
 






