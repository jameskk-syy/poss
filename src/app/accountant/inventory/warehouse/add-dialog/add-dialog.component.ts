import { Component, Inject, OnInit } from '@angular/core';
import { WarehouseService } from '../warehouse.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainComponent } from '../main/main.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { statusArray } from 'src/app/core/models/status';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.sass']
})
export class AddDialogComponent implements OnInit {
  code: String = ""
  title: any = "Create Warehouse"
  form: FormGroup
  statuses: any[] = statusArray
  loading: boolean = false
  action: any = "add"
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,private snackbar: SnackbarService,private service: WarehouseService, public dialogRef: MatDialogRef<MainComponent>) { }

  ngOnInit(): void {
    this.initForm()
    this.setValues()

    console.log("the data passed is ", this.data)
  }

  setValues() {
    this.code = this.data.wh.code
    this.action = this.data.action
    if (this.data.action === "add") {
      this.title = "Create Warehouse"
    } else {
      this.title = "Edit Warehouse Details"
      this.form.get('name').patchValue(this.data.wh.name)
      this.form.get('code').patchValue(this.data.wh.code)
      this.form.get('description').patchValue(this.data.wh.description)
      this.form.get('status').patchValue(this.data.wh.status)
    }
  }

  initForm() {
    this.form=this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      code: [this.code, []]
    })
  }

  close() {
    this.dialogRef.close()
  }

  submit() {
    this.loading = true
    
    if (this.action === "add") {
      this.service.create(this.form.value).subscribe({
        next: (res: any) => {
          if(res.statusCode == 200) {
            this.loading = false;

            this.dialogRef.close()
            this.snackbar.showNotification('snackbar-success', res.message)
          } else {
            this.loading = false;
            this.snackbar.showNotification('snackbar-danger', res.message)
          }
        },
        error: (err) => {
          this.loading = false;
          this.snackbar.showNotification('snackbar-danger', err)
        },
        complete: () => {}
    })
    } else {
      this.service.update(this.form.value, this.data.wh.id).subscribe({
        next: (res: any) => {
          if(res.statusCode == 200) {
            this.loading = false;

            this.dialogRef.close()
            this.snackbar.showNotification('snackbar-success', res.message)
          } else {
            this.loading = false;
            this.snackbar.showNotification('snackbar-danger', res.message)
          }
        },
        error: (err) => {
          this.loading = false;
          this.snackbar.showNotification('snackbar-danger', err)
        },
        complete: () => {}
      })
    }
  }

}
