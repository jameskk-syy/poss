import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerLkupComponent } from 'src/app/accountant/lookups/customer-lkup/customer-lkup.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ManageSpCustomersComponent } from '../../manage-sp-customers/manage-sp-customers.component';
import { SalespersonService } from '../../salesperson.service';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.sass']
})
export class AddCustomersComponent implements OnInit {
  isLoading:Boolean = false;
  loading: boolean = false;
  customers: any;
  customerForm: FormGroup;
  salespersonId: any;
 

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private selespersonService: SalespersonService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<ManageSpCustomersComponent>,
  ) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customer: ['',Validators.required]
    })
  }


  selectCustomer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
  
    const dialogRef = this.dialog.open(CustomerLkupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customers = result.customers;
       
        const customerNames = this.customers.map((customers: any) => customers.name).join(', ');

        this.customerForm.patchValue({
          customer: customerNames,
          id: this.customers.map((customer: any) => customer.id)
        });

      }
    });
  }

  onClick() {
    this.dialogRef.close();
  }

  onSubmit(){
    this.isLoading = true
    this.salespersonId = this.data.salesPersonId
    console.log("id", this.salespersonId)

    this.selespersonService.addCustomer( this.salespersonId, this.customers).subscribe({
      next: (res) => {
        this.loading = false;
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.customerForm.reset();
        this.dialogRef.close();

      },
  
      error: (err) => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", err);
      }
  
    })
  
  }
  
}
