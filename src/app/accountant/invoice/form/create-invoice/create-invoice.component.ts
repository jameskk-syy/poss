import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SkuLkupComponent } from 'src/app/accountant/lookups/sku-lkup/sku-lkup.component';
import {formatDate,sum,groupBy} from 'src/app/data/services/utils'

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

  // activateLookupSubCollectors: boolean = true;
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
  selectedSkuUnit: any;

  constructor(
    
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.invoiceForm = this.createInvoiceForm();
    this.productForm = this.createProductForm();
  }

  createInvoiceForm(): FormGroup {
    return this.fb.group({
      items: new FormArray([]),
      invoice: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],    
      totalAmount: ['', Validators.required],
    });
  }

  createProductForm(): FormGroup {
    return this.fb.group({
      quantity:['', Validators.required],
      code:['', Validators.required]
    });
  }

  selectItemLk(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
     
    };
  
    const dialogRef = this.dialog.open(SkuLkupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sku = result.sku;
        console.log('skkkuuu', this.sku)
        this.productForm.patchValue({
          skuId: this.sku.name,
          code: this.sku.code,
          unit: this.sku.unit

        });
      }

      console.log("item", this.selectedSkuUnit)
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

  onSubmit(){

  }



  addItem() {
    if (this.productForm.get('code').valid) {
      const newItem = {
        quantity: this.productForm.get('quantity').value,
        code: this.productForm.get('code').value,
        unit: this.sku.unit,
        name: this.sku.name

      };

      console.log('unit', this.sku.unit)

      console.log('to the table',newItem)
      this.productDataSource.data = [...this.productDataSource.data,newItem];
      this.productDataSource._updateChangeSubscription();
      this.productNotAdded = this.productDataSource.data.length === 0;
      this.productForm.reset(); 
    }
  }

  removeItem(index: any) {
    this.productDataSource.data.splice(index, 1);
    this.productDataSource._updateChangeSubscription();
    this.productNotAdded = this.productDataSource.data.length === 0; 
  }
  

}
