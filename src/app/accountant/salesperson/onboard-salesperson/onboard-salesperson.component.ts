import { Component, Inject, OnInit } from '@angular/core';
import { SalespersonService } from '../salesperson.service';
import { WarehouseLkupComponent } from '../../lookups/warehouse-lkup/warehouse-lkup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CustomerLkupComponent } from '../../lookups/customer-lkup/customer-lkup.component';
import { SalespersonLkupComponent } from '../../lookups/salesperson-lkup/salesperson-lkup.component';


@Component({
  selector: 'app-onboard-salesperson',
  templateUrl: './onboard-salesperson.component.html',
  styleUrls: ['./onboard-salesperson.component.sass']
})
export class OnboardSalespersonComponent implements OnInit {
  isLoading:Boolean = false;
  loading: boolean = false;
  warehouse: any;
  salespersonForm: FormGroup;
  whseCode: any;
  customer: any;
  customerId: any;
  salesperson: any;
  salespersonId: any;
  customers: any;
  

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
        this.customers = result.customers;
       
        const customerNames = this.customers.map((customers: any) => customers.name).join(', ');

        this.salespersonForm.patchValue({
          customer: customerNames,
          id: this.customers.map((customer: any) => customer.id)
        });

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
  
    const dialogRef = this.dialog.open(SalespersonLkupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.salesperson = result.salesperson;
        console.log ('results sales',this.salesperson)
        this.salespersonForm.patchValue({
          salesperson: this.salesperson.name,
          name: this.salesperson.name,
          id: this.salesperson.id
        });

        this.salespersonId = this.salesperson.id
          
          console.log ('Salespeope',this.salespersonId)
      }
    });
  }


onSubmit(){
  this.isLoading = true

  this.selespersonService.onBoardSalesperson( this.salespersonId,this.whseCode, this.customers).subscribe({
    next: (res) => {
      this.loading = false;
      const successMessage = res.message
      this.snackbar.showNotification("snackbar-success", successMessage);
      this.salespersonForm.reset();
    },

    error: (err) => {
      this.loading = false;
      const errorMessage = err.message
      this.snackbar.showNotification("snackbar-danger", err);
      
    
    }

  })

}

}
