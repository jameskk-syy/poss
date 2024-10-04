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
  selector: 'app-edit-sku',
  templateUrl: './edit-sku.component.html',
  styleUrls: ['./edit-sku.component.sass']
})
export class EditSkuComponent implements OnInit {

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

    this.getProductData()

    this.getPriceData()

    this.skuForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      product: ['',Validators.required],
      price: ['',Validators.required],
      unit: ['',Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
  })

    if(this.data && this.data.sku){

    this.skuForm.patchValue({
      code: this.data.sku.code,
      name: this.data.sku.name,
      product: this.data.sku.product.id,
      price: this.data.sku.priceList.id,
      unit: this.data.sku.unit,
      description: this.data.sku.description,
      status: this.data.sku.status,
    });
    console.log ('desc', this.data.sku)
    console.log ('prod', this.data.sku.product.name)
  }
  }
  

   updateSkuData() {

    
    this.loading = true;
    console.log ('this id',this.data)

    const skuId = this.data.sku.id;
      const priceId = this.skuForm.value.price;

        

    this.subscription = this.service.updateSKu(this.skuForm.value, skuId, priceId).subscribe(res => {
      this.loading = false;
      const successMessage = res.message
      this.snackbar.showNotification("snackbar-success", successMessage);
      this.dialogRef.close(true);  
    }, err => {
      this.loading = false;
      const errorMessage = err.message
      this.snackbar.showNotification("snackbar-danger", errorMessage);
    });
  }



  onClick() {
    this.dialogRef.close();
  }

  getProductData(){
    this.isLoading = true;
    this.subscription = this.service.getProducts().subscribe(res => {
        this.products = res.entity;
        console.log('category name', this.products)
    }, error => {
        this.isLoading = false;
        console.error('Error fetching categories:', error);
    });
}


getPriceData() {
  this.isLoading = true;
  this.subscription = this.PriceService.fetchPrices().subscribe(res => {
    this.prices = res.entity;
    
  }, error => {
    this.isLoading = false;
    console.error
  });
}


// getSkuData(){
//   this.isLoading = true;
//   this.subscription = this.service.getSkus
// }


// getData() {
//   this.isLoading = true;
//     this.subscription = this.service.getSkus().subscribe(res => {
//       this.data = res;
//       console.log ('Skus are here', this.data)
//       if (this.data.entity.length > 0) {
//         this.isLoading = false;
//         this.isdata = true;
//         // Binding with the datasource
//         this.dataSource = new MatTableDataSource(this.data.entity);
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//       }
//       else {
//         this.isdata = false;
//         this.dataSource = new MatTableDataSource<any>(this.data);
//       }
//     })
//  }
}
