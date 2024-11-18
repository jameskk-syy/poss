import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DepartmentsComponent } from '../departments/departments.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ConfigurationsService } from '../../configurations.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.sass']
})
export class AddDepartmentComponent implements OnInit {

  loading = false;
  departmentForm : FormGroup;
  subscription!: Subscription;
  title:string

  constructor(
    public dialogRef: MatDialogRef<DepartmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private configurationsService:ConfigurationsService
  ) 
    { }


  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required]      
    });

    console.log('Action:', this.data.action);

    if (this.data.action === 'edit') {
      this.departmentForm.patchValue({
        name: this.data.department.name
      });
      this.title = 'Edit Department';
    } else {
      this.title = 'Add Department'; 
    }
  }


  onSubmit() {
    if (this.departmentForm.invalid) {
      return;  
    }

    this.loading = true;

    // Call update method if editing
    if (this.data.action === 'edit') {
      this.updateDepartment();
    } else {
      // Add new category
      this.subscription = this.configurationsService.addDepartment(this.departmentForm.value).subscribe({
        next: (res) => {
        this.loading = false;
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.departmentForm.reset();
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

  updateDepartment() {
    this.loading = true;
    this.subscription = this.configurationsService.updateDepartment(this.data.category).subscribe({
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
