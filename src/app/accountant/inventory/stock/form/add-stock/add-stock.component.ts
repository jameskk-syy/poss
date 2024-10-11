import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { StockManagementComponent } from '../../stock-management/stock-management.component';
import { StockService } from '../../stock.service';
import { WarehouseLkupComponent } from 'src/app/accountant/lookups/warehouse-lkup/warehouse-lkup.component';
import { SkuLkupComponent } from 'src/app/accountant/lookups/sku-lkup/sku-lkup.component';
import { count } from 'console';



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
  warehouse: any;
  selectedWarehouseCode: any;
  selectedSkuId: any;
  whseCode: any;
  sku: any;
  title: string;
  isEditMode: any;


  constructor(
    public dialogRef: MatDialogRef<StockManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private service:StockService
  ) { }

  ngOnInit(): void {

    this.isEditMode = this.data.action;
    
    this.stockForm = this.fb.group({
      whseCode: [{value:'', disabled: this.isEditMode !== "create" }, Validators.required],
      skuId: [{ value: '', disabled: this.isEditMode !== "create" },Validators.required],
      count: ['', Validators.required],
      message:['',Validators.required]
    });

    
    if (this.isEditMode === 'remove') {     
      this.title = 'Remove Stock Count';
      this.patchData()
    } else if (this.isEditMode === 'add'){
      this.title = 'Add Stock Count '; 
      this.patchData()
    } else {
      this.title = 'Create New Stock'
    }
  }

  patchData() {
    this.stockForm.patchValue({
      whseCode: this.data.stock.whseCode,
      skuId: this.data.stock.item,
      count: this.data.stock.count,
      message:this.data.stock.message
    });
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
        this.warehouse = result.warehouse;
        console.log ('results war',this.warehouse)

        this.stockForm.patchValue({
          whseid: this.warehouse.name,
          whseCode: this.warehouse.whseCode
        });

          this.whseCode = this.warehouse.whseCode
          console.log ('warehouse',this.whseCode)
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
        this.stockForm.patchValue({
          skuId: this.sku.name,
          id: this.sku.id 
        });
          this.selectedSkuId = this.sku.id
      }
    });
  }

  onSubmit(){
      const count = this.stockForm.value.count

      if (this.data.action !== "create") {
        this.whseCode = this.data.stock.whseCode
        this.selectedSkuId = this.data.stock.skuId

        console.log ('pased code',this.data.stock.whseCode)
        console.log ('pased stock',this.selectedSkuId)
      }

      const data = {
        count: this.stockForm.value.count,
        message: this.stockForm.value.message,
        whseCode: this.whseCode,
        skuId: this.selectedSkuId
      }
      

      this.subscription = this.service.addNewStock(this.data.action,data).subscribe({
        next: (res) => {
          this.loading = false;
          console.log ('jhdjh', this.stockForm )
          const successMessage = res.message
          this.snackbar.showNotification("snackbar-success", successMessage);
          this.stockForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          this.loading = false;
          const errorMessage = err.message
          this.snackbar.showNotification("snackbar-danger", err);
          this.dialogRef.close();
        }
      }
    );
    }

    

    }

