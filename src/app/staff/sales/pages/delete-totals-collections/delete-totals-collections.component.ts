import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TotalsCollectionsComponent } from '../totals-collections/totals-collections.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../../services/sales.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-delete-totals-collections',
  templateUrl: './delete-totals-collections.component.html',
  styleUrls: ['./delete-totals-collections.component.sass']
})
export class DeleteTotalsCollectionsComponent implements OnInit {
  loading = false
  collection: any
  id: any;
  collectorUsername: any
  collectorId: any
  milkQuantity: any
  routeName: any;
  date: any;

  constructor(
    public dialogRef: MatDialogRef<TotalsCollectionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: SalesService,
    private snackbar: SnackbarService,
    private fb: FormBuilder
  ) { }
  subscription!: Subscription
  

  ngOnInit(): void {
    this.collection = this.data.collection
    this.collectorUsername= this.collection.collectorUsername
    this.routeName=this.collection.routeName
    this.id = this.collection.id
    this.milkQuantity = this.collection.milkQuantity
    this.date= this.collection.collectionDate
  }
  onDelete() {
    this.loading = true
    this.subscription = this.service.deleteTotalsCollections(this.id).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "collection deleted successfully.")
      this.loading = false
      this.dialogRef.close()
    }, err => {
      this.loading = false
      this.snackbar.showNotification("snackbar-danger", err);
      this.dialogRef.close()
    })
  }

  onClick() {
    this.dialogRef.close();
  }

}
