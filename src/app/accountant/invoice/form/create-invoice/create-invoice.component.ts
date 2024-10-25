import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  datesArray: string[] = [];
  monthsArray: string[] = [];
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  currentDate = this.datesArray[new Date().getDate()];
  selectedDate: any;
  sku: any;
  selectedSkuId: any;

  


  constructor(
    
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      invoice: ['', ],
      description: ['', Validators.required],
      date: ['', Validators.required],
      item: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: ['', Validators.required],
      totalAmount: ['', Validators.required],
      
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

  selectItem(){
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
        this.invoiceForm.patchValue({
          skuId: this.sku.name,
          id: this.sku.id 
        });
          this.selectedSkuId = this.sku.id
      }
    });
  }

  onSubmit(){

  }

}
