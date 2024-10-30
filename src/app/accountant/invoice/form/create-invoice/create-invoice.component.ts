import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SkuLkupComponent } from 'src/app/accountant/lookups/sku-lkup/sku-lkup.component';
import {formatDate,sum,groupBy} from 'src/app/data/services/utils'
import { InvoiceService } from '../../invoice.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { paymentArray } from 'src/app/core/models/paymentMethods';
import { SalespersonLkupComponent } from 'src/app/accountant/lookups/salesperson-lkup/salesperson-lkup.component';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.sass']
})
export class CreateInvoiceComponent implements OnInit {

  isLoading = false
  loading = false
  isLinear = false;
  invoiceForm: FormGroup;
  productForm: FormGroup;
  datesArray: string[] = [];
  monthsArray: string[] = [];
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  currentDate = this.datesArray[new Date().getDate()];
  selectedDate: any;
  sku: any;
  selectedSkuId: any;
  selectedSkuCode: any;
  productNotAdded = true;
  selectedSkuUnit: any;
  subscription!: Subscription;
  paymentMethods = paymentArray

  productDataSource = new MatTableDataSource<any>([]);
  @ViewChild('subCollectorsPaginator') subCollectorsPaginator : MatPaginator
  @ViewChild('subCollectorsSort') subCollectorsSort : MatSort
  
  productDisplayedColumns: string[] = [
    'name',
    'code',
    'unit',
    'quantity',
    'actions'
  ]
  invoiceFormData: any;
  itemData: any[];
  salesperson: any;
  salespersonId: any;
  

  constructor(
    
    private fb: FormBuilder,
    private dialog: MatDialog,
    private invoiceService: InvoiceService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.invoiceForm = this.createInvoiceForm();
    this.productForm = this.createProductForm();
  }

  createInvoiceForm(): FormGroup {
    return this.fb.group({
      amount: ['', Validators.required],
      date: ['', Validators.required], 
      description: ['', Validators.required],
      invoiceNo: ['', Validators.required],
      // customerCode:['',Validators],
      // paymentMode: ['',Validators],
      // spId:['',Validators],
      items: new FormArray([])      
    });
  }

  createProductForm(): FormGroup {
    return this.fb.group({
      quantity:['', Validators.required],
      skuCode:['', Validators.required]
    });
  }

  selectItemLk(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {};
  
    const dialogRef = this.dialog.open(SkuLkupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sku = result.sku;
        console.log('skkkuuu', this.sku)
        this.productForm.patchValue({
          skuId: this.sku.name,
          skuCode: this.sku.code,
          unit: this.sku.unit
        });
      }
    });
  }

  selectSalespersonLk(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
     
    };
  
    const dialogRef = this.dialog.open(SalespersonLkupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.salesperson = result.salesperson;
        console.log ('results sales',this.salesperson)
        this.invoiceForm.patchValue({
          salesperson: this.salesperson.name,
          name: this.salesperson.name,
          id: this.salesperson.id
        });

        this.salespersonId = this.salesperson.id
          
          console.log ('Salespeope',this.salespersonId)
      }
    });
  }

  
  onSelectDate(): void {
    this.selectedDate = formatDate(this.invoiceForm.value.date,'')
  }

  generateDatesArray(): void {
    const selectedDate = new Date(this.invoiceForm.value.date);

    if (!isNaN(selectedDate.getTime())) {
      this.datesArray = [formatDate(selectedDate,'')];
    } else {
      this.datesArray = [];
    }
  }

  
  addItem() {
    if (this.productForm.get('skuCode').valid) {
      const newItem = {
        quantity: this.productForm.get('quantity').value,
        code: this.productForm.get('skuCode').value,
        unit: this.sku.unit,
        name: this.sku.name
      };

      this.productDataSource.data = [...this.productDataSource.data,newItem];
      this.productDataSource._updateChangeSubscription();
      this.productNotAdded = this.productDataSource.data.length === 0;
      this.productForm.reset(); 
      this.productForm.markAsPristine()
    }
    console.log('items array', this.productDataSource.data)
  }

  removeItem(index: any) {
    this.productDataSource.data.splice(index, 1);
    this.productDataSource._updateChangeSubscription();
    this.productNotAdded = this.productDataSource.data.length === 0; 
  }
  
  onSubmit(){
    this.isLoading = true

    this.itemData = this.productDataSource.data;
    const items = this.productDataSource.data.map(item =>({
      quantity:item.quantity,
      skuCode:item.code
    }))

    console.log ('on the submit',items)
    console.log ('on the submit',this.itemData)
    this.invoiceFormData = this.invoiceForm.getRawValue();
    const data = {
      amount:this.invoiceFormData.amount,
      date:this.invoiceFormData.date,
      description:this.invoiceFormData.description,
      invoiceNo:this.invoiceFormData.invoiceNo,
      soldItems:items
    }
    
    console.log('ytu', data)

    this.subscription = this.invoiceService.addInvoice(data).subscribe({
      next: (res) =>{
        this.loading =false
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.invoiceForm.reset();
        this.invoiceForm.markAsPristine();
      },
      error: (err) => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", errorMessage);
        
        }    
    })
  }

}
