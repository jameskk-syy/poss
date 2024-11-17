import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompanyComponent } from '../company/company.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ConfigurationsService } from '../../configurations.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.sass']
})
export class AddCompanyComponent implements OnInit {

  loading = false;
  companyForm : FormGroup;
  subscription!: Subscription;
  title:string

  constructor(
    public dialogRef: MatDialogRef<CompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private configurationsService:ConfigurationsService
  ) 
    { }


  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      registrationNo: ['', Validators.required],
      kraPin:['', Validators.required]
      
    });

    console.log('Action:', this.data.action);

    if (this.data.action === 'edit') {
      this.companyForm.patchValue({
        name: this.data.company.name,
        address: this.data.company.address,
        phone: this.data.company.phone,
        email: this.data.company.email,
        registrationNo: this.data.company.registrationNo,
        kraPin: this.data.company.kraPin
      });
      this.title = 'Edit Company';
    } else {
      this.title = 'Add Company'; 
    }
  }


  onSubmit() {
    if (this.companyForm.invalid) {
      return;  
    }

    this.loading = true;

    // Call update method if editing
    if (this.data.action === 'edit') {
      this.updateCategory();
    } else {
      // Add new category
      this.subscription = this.configurationsService.addCompany(this.companyForm.value).subscribe({
        next: (res) => {
        this.loading = false;
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.companyForm.reset();
        this.dialogRef.close();
        },  
        error: (err) => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", errorMessage);
        this.dialogRef.close();
        }
    })
    }
  }

  updateCategory() {
    this.loading = true;
    this.subscription = this.configurationsService.updateCompany(this.data.category).subscribe({
    next: (res) => {
      this.loading = false;
      const successMessage = res.message
      this.snackbar.showNotification("snackbar-success", successMessage);
      this.dialogRef.close(true);
      },
      error: (err) =>{
      this.loading = false;
      const errorMessage = err.message
      this.snackbar.showNotification("snackbar-danger", errorMessage);
      }

      })
    }

  onClick() {
    this.dialogRef.close();
  }


}
