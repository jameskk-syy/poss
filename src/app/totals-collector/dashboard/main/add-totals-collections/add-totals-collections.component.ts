import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TotalsCollectionService } from 'src/app/totals-collector/services/totals-collection.service';
import { MainComponent } from '../main/main.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CollectorsLookupsComponent } from 'src/app/staff/dashboard/look-ups/collectors-lookups/collectors-lookups.component';
@Component({
  selector: 'app-add-totals-collections',
  templateUrl: './add-totals-collections.component.html',
  styleUrls: ['./add-totals-collections.component.sass']
})
export class AddTotalsCollectionsComponent implements OnInit {
  [x: string]: any;
  addAccumulationForm: FormGroup;
  showRouteField: boolean = false;
  showAccumulatorField: boolean=false;
  loading = false;
  isLoading: Boolean
  isdata: Boolean

  constructor(public dialogRef:MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private service: TotalsCollectionService,
    private dialog: MatDialog,
    private snackbar: SnackbarService, ) { }
subscription!: Subscription;

ngOnInit(): void {
  this.isLoading = true;
  this.addAccumulationForm = this.fb.group({
    collectorId: ['',Validators.required],

    milkQuantity: ['',Validators.required],
    session: ['',Validators.required],
    accumulatorId: [''],
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
    this.showRouteField = true;

    this.getRoutes(result.data.id);

  });
}

getRoutes(id: any) {
  this.subscription = this.service
    .getCollectorRoutes(id)
    .subscribe((res) => {
      this.data = res;
      if (this.data.entity && this.data.entity.length > 0) {
        this.addAccumulationForm.patchValue({
          routeFk: this.data.entity[0].id, 
        });
      }
    });
}



onSubmit() {

  const authUser = JSON.parse(localStorage.getItem('auth-user'));
  this.addAccumulationForm.get('accumulatorId').setValue(authUser.id);({
    accumulatorId: authUser.id
  // const accumulatorid = authUser.id;
  // this.addAccumulationForm.patchValue({
  //   accumulatorId: accumulatorid

  });
  this.loading = true;

  this.subscription = this.service.addTotalsCollections(this.addAccumulationForm.value).subscribe(res => {
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
