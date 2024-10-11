import { Component, Inject, OnInit } from '@angular/core';
import { SalespersonService } from '../salesperson.service';
import { WarehouseLkupComponent } from '../../lookups/warehouse-lkup/warehouse-lkup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CustomerLkupComponent } from '../../lookups/customer-lkup/customer-lkup.component';


@Component({
  selector: 'app-onboard-salesperson',
  templateUrl: './onboard-salesperson.component.html',
  styleUrls: ['./onboard-salesperson.component.sass']
})
export class OnboardSalespersonComponent implements OnInit {
  loading:any;
  warehouse: any;
  salespersonForm: FormGroup;
  whseCode: any;
  customer: any;
  customerId: any;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private selespersonService: SalespersonService,
  ) { }

  ngOnInit(): void {
    this.salespersonForm = this.fb.group({
      salesperson:['', Validators.required],
      whseCode: ['', Validators.required],
      customer: ['',Validators.required]
    })
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

        this.salespersonForm.patchValue({
          whseid: this.warehouse.name,
          whseCode: this.warehouse.whseCode
        });

          this.whseCode = this.warehouse.whseCode
          console.log ('warehouse',this.whseCode)
      }
    });
  }


  selectCustomer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
     
    };
  
    const dialogRef = this.dialog.open(CustomerLkupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customer = result.customer;
        console.log ('results cust',this.customer.name)

        this.salespersonForm.patchValue({
          customer: this.customer.name,
          id:this.customer.id
        });

          this.customerId = this.customer.id
          console.log ('customer Id',this.customerId)
      }
    });
  }


  selectSalesperson() {
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

        this.salespersonForm.patchValue({
          whseid: this.warehouse.name,
          whseCode: this.warehouse.whseCode
        });

          this.whseCode = this.warehouse.whseCode
          console.log ('warehouse',this.whseCode)
      }
    });
  }

onSubmit(){

}

}
