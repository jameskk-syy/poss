import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ProductService } from '../../product.service';
import { statusArray } from 'src/app/core/models/status';
import { unitArray } from 'src/app/core/models/units';
import { SkuComponent } from '../../sku/sku.component';
import { PriceService } from 'src/app/accountant/price/price.service';

@Component({
  selector: 'app-add-sku',
  templateUrl: './add-sku.component.html',
  styleUrls: ['./add-sku.component.sass']
})
export class AddSkuComponent implements OnInit {

  loading = false;
  isLoading = false;
  subscription!: Subscription;
  statuses = statusArray;
  units = unitArray;
  title:string
  skuForm: FormGroup;
  products: any;
  prices:any;
  isdata: boolean;
  selectedProduct: any;
  selectedPrice:any;

  constructor(
    public dialogRef: MatDialogRef<SkuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private service:ProductService,
    private PriceService: PriceService
  ) 
    { }


  ngOnInit(): void {
    this.skuForm = this.fb.group({
      name: ['', Validators.required],
      product: ['',Validators.required],
      price: ['',Validators.required],
      unit: ['',Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      
    });

    console.log('Action:', this.data.action);
    this.getProductData()
    this.getPriceData()
    
  

    if (this.data.action === 'edit') {
      this.skuForm.patchValue({
        code: this.data.product.code,
        name: this.data.product.name,
        category: this.data.product.category,
        description: this.data.product.description,
        status: this.data.product.status,
      });
      this.title = 'Edit SKU';
    } else {
      this.title = 'Add New SKU'; 
    }
  }


  onSubmit() {
    
      const productId = this.skuForm.value.product;
            console.log ('this id',productId)
      const priceId = this.skuForm.value.price;

        console.log ('this id',productId)
      

      this.subscription = this.service.addSku(this.skuForm.value, productId, priceId).subscribe(res => {
        this.loading = false;
        console.log ('jhdjh', this.skuForm)
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.skuForm.reset();
        this.dialogRef.close();
      }, err => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", errorMessage);
        this.dialogRef.close();
      });
    }
    
    

  onClick() {
    this.dialogRef.close();
  }


  getProductData(){
    this.isLoading = true;
    this.subscription = this.service.getProducts().subscribe(res => {
        this.data = res;
        console.log('categories are here', this.data);
        this.products = this.data.entity.map((item:any) =>item)
        console.log('category name', this.products)
    }, error => {
        this.isLoading = false;
        console.error('Error fetching categories:', error);
    });
}


getPriceData() {
  this.isLoading = true;
  this.subscription = this.PriceService.fetchPrices().subscribe(res => {
    this.data = res;
    console.log('prices are here', this.data);
    this.prices = this.data.entity.map((item:any) => item)
    
  }, error => {
    this.isLoading = false;
    console.error
  });
}
}
