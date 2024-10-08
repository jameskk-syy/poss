import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { StockManagementComponent } from '../../stock-management/stock-management.component';
import { StockService } from '../../stock.service';
import { WarehouseLkupComponent } from 'src/app/accountant/lookups/warehouse-lkup/warehouse-lkup.component';
import { SkuLkupComponent } from 'src/app/accountant/lookups/sku-lkup/sku-lkup.component';



@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.sass']
})
export class AddStockComponent implements OnInit {

  loading = false;
  isLoading = false;
  subscription!: Subscription;
  stockForm: FormGroup;
  categories: any;
  isdata: boolean;
  warehouseData: any;
  selectedWarehouseId: any;
  skuData: any;
  selectedSkuId: any;


  constructor(
    public dialogRef: MatDialogRef<StockManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private service:StockService
  ) { }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      whseCode: ['', Validators.required],
      skuId: ['',Validators.required],
      count: ['', Validators.required],
    });  
  }

  onSubmit(){

  }

  onClick() {
    this.dialogRef.close();
  }

  selectWarehouse() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
     
    };
  
    const dialogRef = this.dialog.open(WarehouseLkupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.warehouseData = result;
        this.stockForm.patchValue({
          username: this.warehouseData.data.name,
          id: this.warehouseData.data.id 
        });
          this.selectedWarehouseId = this.warehouseData.data.id
      }
    });
  }


  selectSkuUnit(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
     
    };
  
    const dialogRef = this.dialog.open(SkuLkupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.skuData = result;
        this.stockForm.patchValue({
          name: this.skuData.data.name,
          id: this.skuData.data.id 
        });
          this.selectedSkuId = this.skuData.data.id
      }
    });
  }

}

