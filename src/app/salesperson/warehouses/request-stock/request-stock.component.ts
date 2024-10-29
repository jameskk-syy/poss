import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockRequisitionComponent } from '../stock-requisition/stock-requisition.component';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogConfig,MatDialog } from '@angular/material/dialog';
import { WarehousesService } from '../warehouses.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SkuLkupComponent } from 'src/app/accountant/lookups/sku-lkup/sku-lkup.component';
import { WarehouseLkupComponent } from 'src/app/accountant/lookups/warehouse-lkup/warehouse-lkup.component';

@Component({
  selector: 'app-request-stock',
  templateUrl: './request-stock.component.html',
  styleUrls: ['./request-stock.component.sass']
})
export class RequestStockComponent implements OnInit {

  stockRequestForm: FormGroup
  subscription!: Subscription;
  isLoading: boolean = false
  pLoading: boolean = false
  sku:any;
  selectedSkuId:any;
 warehouse:any;
 fromWarehouse:any;
 toWarehouse:any;
 whseCode:any;

  constructor(
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    private warehousesService: WarehousesService,
    public dialogRef: MatDialogRef<StockRequisitionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {


    this.stockRequestForm = this.fb.group({
      from: ['', [Validators.required]],
      message: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      skuCode: ['', [Validators.required]],
      to: ['', [Validators.required]],
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
        this.sku = result.sku;
        this.stockRequestForm.patchValue({
          skuCode: this.sku.code,
          id: this.sku.id 
        });
          this.selectedSkuId = this.sku.id
      }
    });
  }

  selectWarehouse(field: 'from' | 'to') {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      field: field
    };
  
    const dialogRef = this.dialog.open(WarehouseLkupComponent, dialogConfig);  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.warehouse = result.warehouse;
        console.log('Selected Warehouse:', this.warehouse);
  
        if (field === 'from') {
          this.stockRequestForm.patchValue({
            from: this.warehouse.whseCode,
          });
          this.fromWarehouse = this.warehouse.whseCode
        } else if (field === 'to') {
          this.stockRequestForm.patchValue({
            to: this.warehouse.whseCode,
          });

          this.toWarehouse = this.warehouse.whseCode
        }
  
        this.whseCode = this.warehouse.whseCode;
        console.log('Warehouse Code:', this.whseCode);
      }
    });
  }

  onSubmit() {

    this.isLoading = true

    this.subscription = this.warehousesService.requestStock(this.stockRequestForm.value)
      .subscribe({
        next:(res) => {
        this.snackBar.showNotification('snackbar-success', 'Successful!');
        this.isLoading = false;
        this.stockRequestForm.reset();
        this.dialogRef.close();
      },
       error: (err) => {
          this.isLoading = false;
          this.snackBar.showNotification('snackbar-danger', err);
              }
  });

  }

  onCancel() {
    this.dialogRef.close()
  }

}


