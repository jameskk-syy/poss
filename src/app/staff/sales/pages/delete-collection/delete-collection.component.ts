import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CollectionsComponent } from '../collections/collections.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../../services/sales.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-collection',
  templateUrl: './delete-collection.component.html',
  styleUrls: ['./delete-collection.component.css']
})
export class DeleteCollectionComponent implements OnInit {

  loading = false
  collection: any

  constructor(
    public dialogRef: MatDialogRef<CollectionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    private service: SalesService,
    ) { }

    subscription!: Subscription
    farmer: any
    farmerNo: any
    id: any
    date: any
    quantity: any
    session: any
    route: any

  ngOnInit(): void {
    this.collection = this.data.collection
    this.farmer = this.collection.farmer
    this.farmerNo = this.collection.farmerNo
    this.id = this.collection.id
    this.date = this.collection.collection_date
    this.quantity = this.collection.quantity
    this.session = this.collection.session
    this.route = this.collection.route
    
  }

  onSubmit() {
    this.loading = true
    this.subscription = this.service.deleteCollections(this.id).subscribe(res => {
      this.snackBar.showNotification("snackbar-success", "collection deleted successfully.")
      this.loading = false
      this.dialogRef.close()
    }, err => {
      this.loading = false
      this.snackBar.showNotification("snackbar-success", err.message)
      this.dialogRef.close()
    })
  }

  onClose() {
    this.dialogRef.close();
  }

}
