import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CollectionsComponent } from '../collections/collections.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from '../../services/sales.service';
import { Delivery } from 'src/app/core/models/delivery';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.sass']
})
export class AddDeliveryComponent implements OnInit {
form: FormGroup
loading: boolean = false
currentUser: any
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<CollectionsComponent>, private snackbar: SnackbarService, private datePipe: DatePipe, private service: SalesService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      farmerNo: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      date: ['', [Validators.required]],
      session: ['', [Validators.required]]
    })

    this.currentUser = this.tokenService.getUser().username
  }

  close(){
    this.dialogRef.close();
  }

  submit() {
    this.loading = true
    this.service.addDelivery(this.data()).subscribe({
      next: (res) => {
        this.loading = false;
        this.dialogRef.close()
        this.snackbar.showNotification("snackbar-success", res.message)
      },
      error: (error) => {
        this.loading = false;
        console.log("error caught:", error)
        this.snackbar.showNotification("snackbar-danger", error)
      }
    })
  }

  data(): Delivery {
    const date = this.datePipe.transform(this.form.value.date, "yyyy-MM-dd")

    const delivery: Delivery = {
      farmerNo: this.form.value.farmerNo,
      status: 'N',
      updatedStatus: 'N',
      paymentStatus: 'N',
      collectorId: '',
      quantity: this.form.value.quantity,
      routeFk: '',
      session: this.form.value.session,
      event: 'Collection',
      collectionDate: date,
      postedBy: this.currentUser
    }

    return delivery;
  }

}
