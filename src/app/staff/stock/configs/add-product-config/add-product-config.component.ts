import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { UseraccountsComponent } from 'src/app/admin/users/useraccounts/useraccounts.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ConfigsService } from '../configs.service';
import { ProductsConfigsComponent } from '../products-configs/products-configs.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-product-config',
  templateUrl: './add-product-config.component.html',
  styleUrls: ['./add-product-config.component.sass']
})
export class AddProductConfigComponent extends BaseComponent implements OnInit {

  configsForm: FormGroup;
  loading = false;
  pLoading: boolean = false
  routes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ConfigsService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<ProductsConfigsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super()
   }

  ngOnInit(): void {
    this.getRoutes();
    
    this.configsForm = this.fb.group({
      productName:["Fresh Milk", [Validators.required]],
      buyingPrice: ["", [Validators.required]],
      sellingPrice: ["", [Validators.required]],
      unitMeasurement: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      memberType: ["", [Validators.required]],
      effectiveFrom: [""],
      routeFk: ["", [Validators.required]]
    });

  }

  getRoutes(){
    this.pLoading = true
    this.service.getRoutes().pipe(takeUntil(this.subject)).subscribe(res => {
      this.pLoading = false
      let routes = res.entity;

      if(routes.length > 0){
        this.routes = routes;
      }
    }, err => {
      this.pLoading = false
      console.log(err)
    })
  }


  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.loading = true;
    this.service.addNewConfiguration(this.configsForm.value).subscribe(
      (res) => {
        if(res.statusCode == 200){
          this.loading = false;
        this.snackbar.showNotification("snackbar-success", "Successful!");
        this.configsForm.reset();
        this.dialogRef.close();
        }else {
          this.loading = false;
          this.snackbar.showNotification("snackbar-danger", res.message);
          this.configsForm.reset();
          this.dialogRef.close();
        }
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }
}
