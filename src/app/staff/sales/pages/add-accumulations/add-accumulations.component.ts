import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SalesService } from '../../services/sales.service';
import { Subscription } from 'rxjs';
import { TotalsCollectionsComponent } from '../totals-collections/totals-collections.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CollectorsLookupsComponent } from 'src/app/staff/dashboard/look-ups/collectors-lookups/collectors-lookups.component';
@Component({
  selector: 'app-add-accumulations',
  templateUrl: './add-accumulations.component.html',
  styleUrls: ['./add-accumulations.component.sass']
})
export class AddAccumulationsComponent implements OnInit {
  [x: string]: any;
  addAccumulationForm: FormGroup;
  loading = false;
  isLoading: Boolean
  isdata: Boolean

  constructor(public dialogRef:MatDialogRef<TotalsCollectionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private service: SalesService,
    private dialog: MatDialog,
    private snackbar: SnackbarService, ) { }
subscription!: Subscription;

  ngOnInit(): void {
    this.isLoading = true;
    this.addAccumulationForm = this.fb.group({
      collectorId: ['',Validators.required],

      milkQuantity: ['',Validators.required],
      session: ['',Validators.required],
      // accumulatorId: ['',Validators.required],
      routeFk: ['',Validators.required],
      // Id: ['',Validators.required],


    });
  }

  selectCollector() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(CollectorsLookupsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result;
      this.addAccumulationForm.patchValue({
        collectorId: result.data.id, 
      });
    });
  }
  


  onSubmit() {
    const authUser = JSON.parse(localStorage.getItem('auth-user'));
    const accumulatorid = authUser.id;
    this.addAccumulationForm.patchValue({
      accumulatorId: accumulatorid
      
    });
    this.loading = true;

    this.subscription = this.service.addAccumulation(this.addAccumulationForm.value).subscribe(res => {
      // console.log(res)
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.addAccumulationForm.reset();
      this.dialogRef.close();
      
    },   err => {
      console.error(err); 
      this.loading = false;
      this.snackbar.showNotification("snackbar-danger", "An error occurred.");
      this.dialogRef.close();
    })
  }

  onClick() {
    this.dialogRef.close();
  }

}
