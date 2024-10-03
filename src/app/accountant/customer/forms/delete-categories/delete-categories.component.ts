import { Component, Inject, OnInit } from '@angular/core';
import { ManageCustomercategoriesComponent } from '../../manage-customercategories/manage-customercategories.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CustomerService } from '../../customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-categories',
  templateUrl: './delete-categories.component.html',
  styleUrls: ['./delete-categories.component.sass']
})
export class DeleteCategoriesComponent implements OnInit {

  category: any
  isloading: boolean = false

  subscription: Subscription

  constructor(
    public dialogRef: MatDialogRef<ManageCustomercategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.category = `Code: ${this.data.category.code}, Name: ${this.data.category.name}`
  }

  onDelete(){
    this.subscription = this.customerService.deleteCategory(this.data.category.id)
    .subscribe((res)=> {
      this.isloading = true;
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.dialogRef.close();
    },
    (err)=> {
      this.isloading = false;
      this.snackbar.showNotification("snackbar-danger", err);
      this.dialogRef.close();
    })
  }

  onCancel(){
    this.dialogRef.close()
  }

}

