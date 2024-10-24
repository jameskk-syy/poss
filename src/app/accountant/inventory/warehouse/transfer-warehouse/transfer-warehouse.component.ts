import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { StockService } from "../../stock/stock.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { WarehouseLkupComponent } from "src/app/accountant/lookups/warehouse-lkup/warehouse-lkup.component";
import { SkuLkupComponent } from "src/app/accountant/lookups/sku-lkup/sku-lkup.component";
import { ConfirmTransferComponent } from "../confirm-transfer/confirm-transfer.component";
import { clear } from "console";
@Component({
  selector: 'app-transfer-warehouse',
  templateUrl: './transfer-warehouse.component.html',
  styleUrls: ['./transfer-warehouse.component.sass']
})
export class TransferWarehouseComponent extends BaseComponent implements OnInit {

  sku: any;
  transferForm: FormGroup;
  warehouse: any;
  whseCode: any;
  loading = false;
  selectedSkuCode: any;
  fromWarehouse: any
  toWarehouse: any
 

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private stockService: StockService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      quantity: ["", [Validators.required]],
      from: ["", [Validators.required]],
      message: ["", [Validators.required]],
      skuName:  ["", [Validators.required]],
      to: ["", [Validators.required]],
    });

  }

  onCancel() {
    this.router.navigate([`/admin/user-accounts/all`]);
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
          this.transferForm.patchValue({
            from: this.warehouse.name,
          });
          this.fromWarehouse = this.warehouse.whseCode
        } else if (field === 'to') {
          this.transferForm.patchValue({
            to: this.warehouse.name,
          });

          this.toWarehouse = this.warehouse.whseCode
        }
  
        this.whseCode = this.warehouse.whseCode;
        console.log('Warehouse Code:', this.whseCode);
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
        this.sku = result.sku;
        this.transferForm.patchValue({
          skuName: this.sku.name,
          skuCode: this.sku.code 
        });
          this.selectedSkuCode = this.sku.code
      }
    });
  }

  onSubmit() {
    const formData = {
      quantity: this.transferForm.value.quantity,
      from: this.fromWarehouse,
      to: this.toWarehouse,
      message: this.transferForm.value.message,
      skuCode: this.selectedSkuCode
    };
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
  
    dialogConfig.data = {
      action: "edit",
      formData: formData
    };
  
    this.dialog.open(ConfirmTransferComponent, dialogConfig).afterClosed().subscribe({
      next: () => {
        this.clearForm()
      },
    });
  }

  clearForm() {
    this.transferForm.reset()
    this.transferForm.get('quantity')
    this.transferForm.get('from').markAsUntouched()
    this.transferForm.get('message').markAsUntouched()
    this.transferForm.get('skuName').markAsUntouched()
    this.transferForm.get('to').markAsUntouched()
  }
  
}

