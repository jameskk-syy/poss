import { Component, Inject, OnInit } from '@angular/core';
import { TotalsCollectionsComponent } from '../totals-collections/totals-collections.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../../services/sales.service';
@Component({
  selector: 'app-edit-totals-collections',
  templateUrl: './edit-totals-collections.component.html',
  styleUrls: ['./edit-totals-collections.component.sass']
})
export class EditTotalsCollectionsComponent implements OnInit {
  editForm: FormGroup;
  loading = false;
  collection: any
  collectorUsername: any;

  constructor(public dialogRef: MatDialogRef<TotalsCollectionsComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private service: SalesService,
    private snackbar: SnackbarService) { }
    subscription!: Subscription;

    collector: any
    collectorId: any
  ngOnInit(): void {
    this.collection=this.data.collection
    this.collectorUsername=this.collection.collectorUsername
    // console.log(this.collection=this.data.collection)
    this.collectorId=this.collection.collectorId

    this.editForm = this.fb.group({
      collectorId:[this.collection.collectorId,[Validators.required]],
      milkQuantity:[this.collection.milkQuantity,[Validators.required]], 
      collectionDate:[this.collection.collectionDate, [Validators.required]],
      session: [this.collection.session == "session 1"? "Morning" : (this.collection.session == "session 2" ? "Afternoon" : "Evening"), [Validators.required]]     
    })
  }
  onSubmit() {
    this.loading = true;
    this.subscription = this.service.updateTotalsCollections(this.editForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.editForm.reset();
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
