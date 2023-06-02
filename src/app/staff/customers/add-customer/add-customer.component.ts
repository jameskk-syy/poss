import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageCustomersComponent } from '../manage-customers/manage-customers.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.sass']
})
export class AddCustomerComponent implements OnInit {

  customerRegirstartionForm: FormGroup


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ManageCustomersComponent>,
    
  ) { }

  ngOnInit(): void {


    this.customerRegirstartionForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });

  }

}
