import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageCustomersComponent } from '../../customers/manage-customers/manage-customers.component';

@Component({
  selector: 'app-view-sales-person',
  templateUrl: './view-sales-person.component.html',
  styleUrls: ['./view-sales-person.component.sass']
})
export class ViewSalesPersonComponent implements OnInit {

  salesPersonForm: FormGroup;
  salesPersonName: any
  loading = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ManageCustomersComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.salesPersonName = this.data.salesPerson.firstName + " " + this.data.salesPerson.lastName
    this.salesPersonForm = this.customerDetailsForm();
  }

  customerDetailsForm(): FormGroup {
    return this.fb.group({

      firstname: [this.data.salesPerson.firstName, [Validators.required]],
      lastname: [this.data.salesPerson.lastName, [Validators.required]],
      email: [this.data.salesPerson.email, [Validators.required]],
      mobile: [this.data.salesPerson.mobile, [Validators.required]],
      username: [this.data.salesPerson.username, [Validators.required]],
      status: [this.data.salesPerson.status, [Validators.required]],
      allocatedOn: [this.data.salesPerson.creationDate, [Validators.required]],
    });
  }

  onCancel(){
    this.dialogRef.close();
  }

}
