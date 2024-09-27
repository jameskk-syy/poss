import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ProductsComponent } from '../../products/products.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass']
})
export class AddProductComponent implements OnInit {

  loading = false;
  constructor(
    public dialogRef: MatDialogRef<ProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,) 
    { }
  subscription!: Subscription;

  ngOnInit(): void {
  }

  onSubmit() {
  //   this.loading = true;
  //   this.subscription = this.service.addNewDepartment(this.addDepartmentForm.value).subscribe(res => {
  //     this.loading = false;
  //     this.snackbar.showNotification("snackbar-success", "Successful!");
  //     this.addDepartmentForm.reset();
  //     this.dialogRef.close();
  //   }, err => {
  //     this.loading = false;
  //     this.snackbar.showNotification("snackbar-danger", err);
  //     this.dialogRef.close();
  //   })
  // }

  // onlick() {
  //   this.dialogRef.close();
  // }

}
}






