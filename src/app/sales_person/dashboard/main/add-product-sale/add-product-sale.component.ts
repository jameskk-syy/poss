import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ProductSaleService } from '../service/product-sale.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainComponent } from '../main.component';

@Component({
  selector: 'app-add-product-sale',
  templateUrl: './add-product-sale.component.html',
  styleUrls: ['./add-product-sale.component.sass']
})
export class AddProductSaleComponent implements OnInit {
  productSalesAssignment: FormGroup
  subscription!: Subscription;
  method=""
  filterForm: FormGroup
  customertype="corporate"
  selectedCustomer: any
  routePrice:number
  
  isLoading: boolean = false
  pLoading: boolean = false

  routes: any
  customers: any
  amount:any
  prices: Record<string,number>
  amountToPay: number
  mpesa_number:string;
  

  constructor(
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    private salesservice: ProductSaleService,
    public dialogRef: MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.productSalesAssignment = this.fb.group({
      customerFk: ['', [Validators.required]],
      productFk: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      routeFk: ['', [Validators.required]],
      paymentMethod: [''],

    });
    this.filterForm = this.fb.group({
      cash_amount: [''],
      mpesa_number: [''],
    })
    this.getRoutes();
    this.getCustomers();
    // this.getSalesPersons();
  }
  getRoutePrice(event:any){
    this.isLoading = true;
    const routeFk:number = event.value;
    const quantity:number = this.productSalesAssignment.value.quantity;
    this.salesservice.getPrices(routeFk).subscribe(res=>{
      this.isLoading = false;
        this.routePrice = res.entity.selling_price;
        this.amountToPay = isNaN(Number(quantity)* this.routePrice) ?0:
    Number(quantity)* this.routePrice
    })
  }
  updateQuantity(){
    this.amountToPay = isNaN(Number(this.productSalesAssignment.value.quantity)* this.routePrice) ?0:
    Number(this.productSalesAssignment.value.quantity)* this.routePrice
  }
  customerSelected(event:any){
    this.selectedCustomer = this.customers.filter(c=> c.id==event.value)[0]
  }
  getRoutes() {
    this.pLoading = true
    this.subscription = this.salesservice.fetchRoutes().subscribe((res) => {
      if (res.entity.length > 0) {
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

  

  onSubmit(){
    this.isLoading = true
    const salesPersonFk = JSON.parse(localStorage.getItem('auth-user')).id;
    const data = {...this.productSalesAssignment.value,salesPersonFk}

    this.subscription = this.salesservice.addSale(data)
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

  computeAmount(){
    this.isLoading = true;
    const routeFk:number = this.productSalesAssignment.value.routeFk;
    const quantity:number = this.productSalesAssignment.value.quantity;
    this.salesservice.getPrices(routeFk).subscribe(res=>{
      this.isLoading = false;
      this.prices = {buying_price:res.entity.buying_price,
        selling_price:res.entity.selling_price};
        this.amountToPay = quantity * this.prices.selling_price;
    })
  }

  mpesaPayment(){
    this.isLoading = true;
    const routeFk:number = this.productSalesAssignment.value.routeFk;
    const quantity:number = this.productSalesAssignment.value.quantity;
    let mpesa_number: string = this.filterForm.value.mpesa_number
    const pattern = /^(\+254|254|0)\d{9}$/
    if(pattern.test(mpesa_number) && mpesa_number.startsWith('0')){
      mpesa_number = '254'+mpesa_number.substring(1)

    }else if(pattern.test(mpesa_number) && mpesa_number.startsWith('+')){
      mpesa_number = mpesa_number.substring(1)
    }else if(!pattern.test(mpesa_number)){
      this.snackBar.showNotification('red','Invalid number')
      return;
    }
    this.salesservice.getPrices(routeFk).subscribe(res=>{
      this.prices = {buying_price:res.entity.buying_price,
        selling_price:res.entity.selling_price};
        this.amountToPay = quantity * this.prices.selling_price;
        this.salesservice.pushNotification({amount:this.amountToPay,mpesa_number}).subscribe((r:any)=>{
          this.isLoading = false;
          if(r.customerMessage.indexOf('Success')){
            this.snackBar.showNotification('success','Notification sent')
          }else{
            this.snackBar.showNotification('error','Pending transaction')
          }
          
        })
    })
  }
}
