import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CollectorsFloatAllocationsComponent } from '../collectors-float-allocations/collectors-float-allocations.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../../services/sales.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { Subscription } from 'rxjs';
import { LookupOneMilkcollectorComponent } from '../lookup-one-milkcollector/lookup-one-milkcollector.component';
import { SalesPersonsLookupComponent } from '../sales-persons-lookup/sales-persons-lookup.component';

@Component({
  selector: 'app-milk-allocation',
  templateUrl: './milk-allocation.component.html',
  styleUrls: ['./milk-allocation.component.sass']
})
export class MilkAllocationComponent implements OnInit {

  allocationForm: FormGroup;
  loading = false;

  constructor(public dialogRef: MatDialogRef<CollectorsFloatAllocationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: SalesService,
    private dialog: MatDialog,
    private tokenService: TokenStorageService) { }
  subscription!: Subscription;

  ngOnInit(): void {
    this.allocationForm = this.fb.group({
      allocatedBy: [this.tokenService.getUser().username],
      salesPersonFk: [""],
      allocatedMilkQuantity: ["", [Validators.required]],
    })
  }


  salesPerson: any;

  pickSalesPerson() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(SalesPersonsLookupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.salesPerson = result.data;
      this.allocationForm.patchValue({
        salesPersonFk: this.salesPerson.id,
        collectorName: this.salesPerson.username,
      });
    });
  }

  onSubmit() {
    this.loading = true;
    this.subscription = this.service.addMilkAllocation(this.allocationForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.allocationForm.reset();
      this.dialogRef.close();
    }, err => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-danger", err);
      this.dialogRef.close();
    })
  }

  onClick() {
    this.dialogRef.close();
  }

}
