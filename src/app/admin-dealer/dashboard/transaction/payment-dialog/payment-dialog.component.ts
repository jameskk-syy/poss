import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.sass']
})
export class PaymentDialogComponent implements OnInit{
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dashboarApi:DashboardService,
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.paymentForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^07[0-9]{8}$')]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }
  ngOnInit(): void {
    alert(this.data.amount)
    this.paymentForm.controls.amount.setValue(this.data?.amount)
  }

  makePayment(): void {
    if (!this.paymentForm.valid) {
      const data = {
        amount: this.paymentForm.controls.amount.value,
        phoneNumber: this.paymentForm.controls.phoneNumber.value,
        accountReference: 1223
      }
      this.dashboarApi.makeMpesaPayment(data).pipe().subscribe(
        res=>{
          alert("Payment intiated")
        },
        err=>{
          alert("payment failed")
        }
      )
    }
    else{
      alert("not a valid form")
    }
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
