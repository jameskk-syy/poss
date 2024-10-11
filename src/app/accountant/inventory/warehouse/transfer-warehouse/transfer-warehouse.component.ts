import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { WarehouseService } from "../warehouse.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { WarehouseLkupComponent } from "src/app/accountant/lookups/warehouse-lkup/warehouse-lkup.component";

@Component({
  selector: 'app-transfer-warehouse',
  templateUrl: './transfer-warehouse.component.html',
  styleUrls: ['./transfer-warehouse.component.sass']
})
export class TransferWarehouseComponent extends BaseComponent implements OnInit {

 
  transferForm: FormGroup;
  warehouse: any;
  whseCode: any;
  loading = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private warehouseService: WarehouseService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      count: ["", [Validators.required]],
      from: ["", [Validators.required]],
      message: ["", [Validators.required]],
      skuCode: ["", [Validators.required]],
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
            whseCode: this.warehouse.whseCode
          });
        } else if (field === 'to') {
          this.transferForm.patchValue({
            to: this.warehouse.name,
            whseCode: this.warehouse.whseCode
          });
        }
  
        this.whseCode = this.warehouse.whseCode;
        console.log('Warehouse Code:', this.whseCode);
      }
    });
  }

  onSubmit() {
    this.loading = true;

    this.warehouseService.createUserAccounts(this.transferForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.loading = false;

          console.log(res);

          if(res.statusCode == 200 || res.statusCode == 201){
            this.snackbar.showNotification(res.message, "snackbar-success");

             this.router.navigate([`/admin/user-accounts/all`]);
          }else {
            this.snackbar.showNotification(res.message, "snackbar-danger")

            this.loading = false;
          }
        },
        (err) => {
          console.log(err)
          this.snackbar.showNotification(err.error.error, "snackbar-danger");
          console.log(err);
          this.loading = false;
        }
      );
  }
}

