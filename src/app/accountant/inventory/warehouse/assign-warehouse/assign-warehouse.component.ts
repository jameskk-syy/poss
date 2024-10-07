import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { FarmerLookupComponent } from 'src/app/staff/farmer/pages/farmer-lookup/farmer-lookup.component';
import { FarmerService } from 'src/app/staff/farmer/services/farmer.service';
import { MainComponent } from '../main/main.component';
import { WarehouseService } from '../warehouse.service';
import { DatePipe } from '@angular/common';
import { UserLookupComponent } from 'src/app/accountant/lookups/user-lookup/user-lookup.component';

@Component({
  selector: 'app-assign-warehouse',
  templateUrl: './assign-warehouse.component.html',
  styleUrls: ['./assign-warehouse.component.sass']
})
export class AssignWarehouseComponent implements OnInit {
  warehouseAssignForm: FormGroup

  dialogData: any;
  loading: boolean
  title: any
  selectedOwnerId: any;
  selectedWhseCode: any;
  wh: any;
  
  constructor(
    public dialogRef: MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private service: WarehouseService,
    private datePipe: DatePipe
  ) {
    // this.title = data.data;
    // console.log("Title == ", this.title)
  }

  ngOnInit(): void {

    this.warehouseAssignForm = this.fb.group({
      username: ["", [Validators.required]],
         })
   
  }

  selectUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      action: "edit",
    };
  
    const dialogRef = this.dialog.open(UserLookupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogData = result;
        this.warehouseAssignForm.patchValue({
          username: this.dialogData.data.username,
          id: this.dialogData.data.id 
        });
          this.selectedOwnerId = this.dialogData.data.id;
      }
    });
  }

  onSubmit() {
    this.loading = true;
  
    const ownerId = this.selectedOwnerId;  
    const whseCode = this.data.wh.code; 
  
    console.log('Owner ID:', ownerId);
    console.log('Warehouse Code:', whseCode);
  
    this.service.assignUser(whseCode, ownerId, this.warehouseAssignForm.value.username)
      .subscribe((res) => {
        this.snackbar.showNotification('snackbar-success', 'Warehouse Assigned Succesfully!');
        this.loading = false;
        this.warehouseAssignForm.reset();
        this.dialogRef.close();
      },
        (err) => {
          this.loading = false;
          this.snackbar.showNotification('snackbar-danger', err);
        });
  }
  
 
  onClick() {

  }


}

